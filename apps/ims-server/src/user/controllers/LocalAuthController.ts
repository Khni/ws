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
import { LocalAuth } from "../services/LocalAuthService.js";
import type { Request as ExpressRequestType, Response } from "express";
import { AuthError, authErrorMapping, RefreshTokenCookie } from "@khaled/auth";
import { errorMapper, InputValidationError } from "@khaled/error-handler";

import { config } from "../../config/envSchema.js";
import { validateBodySchema } from "../../utils/schema/validateBodySchemaMiddleware.js";
import { ZodError } from "zod";
import { validateZodSchemaMiddleware } from "../../core/schema/validateZodErrorMiddleware.js";
import { zodErrorSerializer } from "../../core/schema/ZodErrorSerializer.js";
import { registerBodySchema } from "@khaled/ims-shared";

@Tags("Authentication")
@Route("auth")
export class AuthController extends Controller {
  private localAuthService: LocalAuth;
  private refreshTokenCookie: RefreshTokenCookie;

  constructor() {
    super();
    this.localAuthService = new LocalAuth();
    this.refreshTokenCookie = new RefreshTokenCookie(
      config.NODE_ENV === "production"
    );
  }

  @Middlewares([validateZodSchemaMiddleware(registerBodySchema)])
  @Post("register")
  @SuccessResponse("201", "Created")
  public async register(
    @Body()
    body: {
      password: string;

      firstName: string;
      lastName: string;
      identifier: { type: "email" | "phone"; value: string }; //this will be added by zod
    },
    @Request() req: ExpressRequestType
  ) {
    try {
      const { user, tokens } = await this.localAuthService.register(body);
      this.refreshTokenCookie.setToken(tokens.refreshToken, req.res!);

      return { accessToken: tokens.accessToken, user };
    } catch (error) {
      if (error instanceof AuthError) {
        throw errorMapper(error, authErrorMapping);
      }
      console.log(error);

      throw error;
    }
  }
}
