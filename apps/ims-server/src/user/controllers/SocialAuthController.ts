import { Controller, Post, Route, Tags, Request, Query } from "tsoa";

import type { Request as ExpressRequestType } from "express";
import { AuthError, authErrorMapping } from "@khaled/auth";
import { errorMapper } from "@khaled/error-handler";

import container from "../../container.js";

@Tags("social-auth")
@Route("social-auth")
export class SocialAuthController extends Controller {
  private socialLogin = container.resolve("socialAuthLogin");
  constructor() {
    super();
  }

  @Post("google")
  public async googleLogin(
    @Query() code: string,
    @Request() req: ExpressRequestType
  ) {
    try {
      const result = await this.socialLogin.execute(code, "google");
      return result;
    } catch (error) {
      if (error instanceof AuthError) {
        throw errorMapper(error, authErrorMapping);
      }

      throw error;
    }
  }

  @Post("facebook")
  public async facebookLogin(
    @Query() code: string,
    @Request() req: ExpressRequestType
  ) {
    try {
      const result = await this.socialLogin.execute(code, "facebook");
      return result;
    } catch (error) {
      if (error instanceof AuthError) {
        throw errorMapper(error, authErrorMapping);
      }

      throw error;
    }
  }
}
