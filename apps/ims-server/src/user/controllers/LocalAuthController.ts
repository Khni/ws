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
import { RegisterBodyschema } from "./schema.js";
import { config } from "../../config/envSchema.js";
import { validateBodySchema } from "../../utils/schema/validateBodySchemaMiddleware.js";
import { ZodError } from "zod";
import { zodErrorSerializer } from "../../core/ZodErrorSerializer.js";
import { validateZodErrorMiddleware } from "../../core/validateZodErrorMiddleware.js";
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

  @Middlewares([validateZodErrorMiddleware(RegisterBodyschema)])
  @Post("register")
  @SuccessResponse("201", "Created")
  public async register(
    @Body()
    body: {
      password: string;
      identifier: string;
      firstName: string;
      lastName: string;
    },
    @Request() req: ExpressRequestType
  ) {
    try {
      const data = RegisterBodyschema.parse(body);
      const { user, tokens } = await this.localAuthService.register(data);
      this.refreshTokenCookie.setToken(tokens.refreshToken, req.res!);

      return { accessToken: tokens.accessToken, user };
    } catch (error) {
      if (error instanceof AuthError) {
        throw errorMapper(error, authErrorMapping);
      }
      if (error instanceof ZodError) {
        throw new InputValidationError(error, zodErrorSerializer);
      }
      throw error;
    }
  }
}
