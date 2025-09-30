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
  LocalLoginInput,
  ResetForgettenPasswordInput,
} from "@khaled/ims-shared";
import { type ILocalLoginService } from "../interfaces/IlocalLoginService.js";
import { refreshTokenCookieOpts } from "../../config/constants.js";
import container from "../../container.js";
import { LocalLoginService } from "../services/LocalLoginService.js";

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
    )
  ) {
    super();
  }

  @Middlewares([validateZodSchemaMiddleware(loginBodySchema)])
  @Post("login")
  @SuccessResponse("200", "Success")
  public async login(
    @Body()
    body: LocalLoginInput,
    @Request() req: ExpressRequestType
  ) {
    try {
      const { user, tokens } = await this.localLoginService.login(body);
      const { cookieName, ...rest } = refreshTokenCookieOpts;
      req.res?.cookie(cookieName, tokens.refreshToken, rest);

      return { accessToken: tokens.accessToken, user };
    } catch (error) {
      if (error instanceof AuthError) {
        throw errorMapper(error, authErrorMapping);
      }

      throw error;
    }
  }

  @Middlewares([validateZodSchemaMiddleware(otpSignUpBodySchema)])
  @Post("sign-up")
  public async signUp(
    @Body()
    { name, password }: OtpSignUpInput,
    @Request() req: ExpressRequestType
  ) {
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

  @Middlewares([validateZodSchemaMiddleware(resetForgettenPasswordBodySchema)])
  @Post("forget-password")
  public async resetForgettenPassword(
    @Body()
    { newPassword }: ResetForgettenPasswordInput,
    @Request() req: ExpressRequestType
  ) {
    const token = req.headers["authorization"]?.replace("Bearer ", "") || "";
    try {
      return await this.otpForgetPasswordService.execute({
        data: { newPassword },
        token,
      });
    } catch (error) {
      if (error instanceof AuthError) {
        throw errorMapper(error, authErrorMapping);
      }

      throw error;
    }
  }
}
