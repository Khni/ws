import {
  Body,
  Controller,
  Middlewares,
  Post,
  Route,
  SuccessResponse,
  Tags,
  Request,
} from "tsoa";

import type { Request as ExpressRequestType } from "express";
import { AuthError, authErrorMapping } from "@khaled/auth";
import { errorMapper } from "@khaled/error-handler";

import { validateZodSchemaMiddleware } from "../../core/schema/validateZodErrorMiddleware.js";

import {
  loginBodySchema,
  otpSignUpBodySchema,
  resetForgettenPasswordBodySchema,
  type OtpSignUpInput,
} from "@khaled/ims-shared";
import type {
  AuthResponseType,
  LocalLoginInput,
  ResetForgettenPasswordInput,
} from "@khaled/ims-shared";
import { type ILocalLoginService } from "../interfaces/IlocalLoginService.js";
import { refreshTokenCookieOpts } from "../../config/constants.js";
import container from "../../container.js";
import { LocalLoginService } from "../services/LocalLoginService.js";
import { A } from "vitest/dist/chunks/environment.d.cL3nLXbE.js";

@Tags("auth")
@Route("auth")
export class LoginController extends Controller {
  constructor(
    private localLoginService: ILocalLoginService = container.resolve<LocalLoginService>(
      "localLoginService"
    ),
    private otpSignUpService = container.resolve("otpSignUpService"),
    private otpForgetPasswordService = container.resolve(
      "otpForgetPasswordService"
    ),
    private tokenService = container.resolve("authTokenService")
  ) {
    super();
  }

  @Middlewares([validateZodSchemaMiddleware({ bodySchema: loginBodySchema })])
  @Post("login")
  @SuccessResponse("200", "Success")
  public async login(
    @Body()
    body: LocalLoginInput,
    @Request() req: ExpressRequestType
  ): Promise<AuthResponseType> {
    try {
      const result = await this.localLoginService.login(body);
      const { cookieName, ...rest } = refreshTokenCookieOpts;
      req.res?.cookie(cookieName, result.tokens.refreshToken, rest);

      return result;
    } catch (error) {
      if (error instanceof AuthError) {
        throw errorMapper(error, authErrorMapping);
      }

      throw error;
    }
  }

  @Middlewares([
    validateZodSchemaMiddleware({ bodySchema: otpSignUpBodySchema }),
  ])
  @Post("sign-up")
  public async signUp(
    @Body()
    { name, password }: OtpSignUpInput,
    @Request() req: ExpressRequestType
  ): Promise<AuthResponseType> {
    const token = req.headers["authorization"]?.replace("Bearer ", "") || "";
    try {
      const result = await this.otpSignUpService.execute({
        data: { name, password },
        token,
      });

      return result;
    } catch (error) {
      if (error instanceof AuthError) {
        throw errorMapper(error, authErrorMapping);
      }

      throw error;
    }
  }

  @Middlewares([
    validateZodSchemaMiddleware({
      bodySchema: resetForgettenPasswordBodySchema,
    }),
  ])
  @Post("forget-password")
  public async resetForgettenPassword(
    @Body()
    { newPassword }: ResetForgettenPasswordInput,
    @Request() req: ExpressRequestType
  ) {
    const token = req.headers["authorization"]?.replace("Bearer ", "") || "";
    try {
      await this.otpForgetPasswordService.execute({
        data: { newPassword },
        token,
      });

      return { message: "Password reset successful" };
    } catch (error) {
      if (error instanceof AuthError) {
        throw errorMapper(error, authErrorMapping);
      }

      throw error;
    }
  }

  @Post("logout")
  public async logout(
    @Request()
    req: ExpressRequestType,
    @Body() body: { refreshToken?: string }
  ) {
    try {
      const token = req.cookies.refreshToken || body?.refreshToken;

      await this.tokenService.logout(token);
      const { cookieName, ...rest } = refreshTokenCookieOpts;
      req.res?.clearCookie(cookieName, rest);

      return { message: "Logged out successfully" };
    } catch (error) {
      if (error instanceof AuthError) {
        throw errorMapper(error, authErrorMapping);
      }
      throw error;
    }
  }
}
