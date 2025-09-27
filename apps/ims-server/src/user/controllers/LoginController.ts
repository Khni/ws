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
import { AuthError, authErrorMapping, LocalAuthService } from "@khaled/auth";
import { errorMapper } from "@khaled/error-handler";

import { validateZodSchemaMiddleware } from "../../core/schema/validateZodErrorMiddleware.js";

import { loginBodySchema } from "@khaled/ims-shared";
import { type ILocalLoginService } from "../interfaces/IlocalLoginService.js";
import { refreshTokenCookieOpts } from "../../config/constants.js";
import container from "../../container.js";
import { LocalLoginService } from "../services/LocalLoginService.js";

@Tags("login")
@Route("login")
export class LoginController extends Controller {
  constructor(
    private localLoginService: ILocalLoginService = container.resolve<LocalLoginService>(
      "localLoginService"
    )
  ) {
    super();
  }

  @Middlewares([validateZodSchemaMiddleware(loginBodySchema)])
  @Post()
  @SuccessResponse("200", "Success")
  public async login(
    @Body()
    body: {
      password: string;
      identifier: { type: "email" | "phone"; value: string }; //this will be added by zod
    },
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
}
