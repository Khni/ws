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

import { loginBodySchema } from "@khaled/ims-shared";
import { type ILocalLoginService } from "../interfaces/IlocalLoginService.js";
import { refreshTokenCookieOpts } from "../../config/constants.js";

@Tags("Authentication")
@Route("login")
export class AuthController extends Controller {
  constructor(private localLoginService: ILocalLoginService) {
    super();
  }

  @Middlewares([validateZodSchemaMiddleware(loginBodySchema)])
  @Post()
  @SuccessResponse("200", "Success")
  public async localLogin(
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
