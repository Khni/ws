import { errorMapper } from "@khaled/error-handler";
import {
  Tags,
  Route,
  Controller,
  Middlewares,
  Post,
  Body,
  Request,
} from "tsoa";

import {
  refreshTokenBodySchema,
  type RefreshTokenInput,
} from "@khaled/ims-shared";
import type {
  Request as ExpressRequestType,
  Response as ExpressResponseType,
} from "express";
import container from "../../container.js";
import { validateZodSchemaMiddleware } from "../../core/schema/validateZodErrorMiddleware.js";
import { refreshTokenCookieOpts } from "../../config/constants.js";
import { AuthError, authErrorMapping } from "@khaled/auth";

@Tags("token")
@Route("token")
export class RefreshTokenController extends Controller {
  private tokenService = container.resolve("authTokenService");
  constructor() {
    super();
  }

  @Middlewares([
    validateZodSchemaMiddleware({ bodySchema: refreshTokenBodySchema }),
  ])
  @Post("refresh")
  public async refreshToken(
    @Body() body: RefreshTokenInput,
    @Request() req: ExpressRequestType
  ): Promise<{ accessToken: string }> {
    // Try to get token from cookie first
    const token = req.cookies.refreshToken || body.refreshToken;

    try {
      const { refreshToken, accessToken } =
        await this.tokenService.refresh(token);
      const { cookieName, ...rest } = refreshTokenCookieOpts;
      req.res?.cookie(cookieName, refreshToken, rest);

      return { accessToken };
    } catch (error) {
      if (error instanceof AuthError) {
        throw errorMapper(error, authErrorMapping);
      }
      throw error;
    }
  }
}
