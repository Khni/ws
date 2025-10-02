import {
  Controller,
  Post,
  Route,
  Tags,
  Request,
  Query,
  Middlewares,
  SuccessResponse,
  Get,
} from "tsoa";

import type { Request as ExpressRequestType } from "express";
import { AuthError, authErrorMapping } from "@khaled/auth";
import { errorMapper } from "@khaled/error-handler";

import container from "../../container.js";
import { M } from "vitest/dist/chunks/reporters.d.BFLkQcL6.js";
import { validateBodySchema } from "@khaled/utils";
import { validateZodSchemaMiddleware } from "../../core/schema/validateZodErrorMiddleware.js";
import { SocialLoginParamsSchema } from "@khaled/ims-shared";
import { config } from "../../config/envSchema.js";
import { refreshTokenCookieOpts } from "../../config/constants.js";

@Tags("oauth")
@Route("oauth")
export class SocialAuthController extends Controller {
  private socialLogin = container.resolve("socialAuthLogin");
  constructor() {
    super();
  }
  @Middlewares([
    validateZodSchemaMiddleware({ querySchema: SocialLoginParamsSchema }),
  ])
  @Get("google")
  @SuccessResponse(302, "Redirect")
  public async googleLogin(
    @Query() code: string,
    @Request() req: ExpressRequestType
  ) {
    try {
      const result = await this.socialLogin.execute(code, "google");
      const { cookieName, ...rest } = refreshTokenCookieOpts;
      req.res?.cookie(cookieName, result.refreshToken, rest);
      req.res?.redirect(config.FRONTEND_SOCIAL_REDIRECT);
    } catch (error: any) {
      console.log("error", error.messqage);
      if (error instanceof AuthError) {
        throw errorMapper(error, authErrorMapping);
      }

      throw error;
    }
  }
  @Middlewares([
    validateZodSchemaMiddleware({ querySchema: SocialLoginParamsSchema }),
  ])
  @Get("facebook")
  @SuccessResponse(302, "Redirect")
  public async facebookLogin(
    @Query() code: string,
    @Request() req: ExpressRequestType
  ) {
    try {
      const result = await this.socialLogin.execute(code, "facebook");

      const { cookieName, ...rest } = refreshTokenCookieOpts;
      req.res?.cookie(cookieName, result.refreshToken, rest);
      req.res?.redirect(config.FRONTEND_SOCIAL_REDIRECT);
    } catch (error) {
      if (error instanceof AuthError) {
        throw errorMapper(error, authErrorMapping);
      }

      throw error;
    }
  }
}
