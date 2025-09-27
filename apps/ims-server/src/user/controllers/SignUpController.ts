import {
  Body,
  Controller,
  Middlewares,
  Post,
  Route,
  Tags,
  Request,
} from "tsoa";

import type { Request as ExpressRequestType } from "express";
import {
  AuthError,
  authErrorMapping,
  OtpHandler,
  RefreshTokenCookie,
} from "@khaled/auth";
import { errorMapper } from "@khaled/error-handler";

import { validateZodSchemaMiddleware } from "../../core/schema/validateZodErrorMiddleware.js";

import {
  otpSignUpBodySchema,
  type OtpSignUpInput,
  requestOtpBodySchema,
  verifyOtpBodySchema,
} from "@khaled/ims-shared";

import { OtpType } from "../../../generated/prisma/index.js";
import container from "../../container.js";

@Tags("sign-up")
@Route("sign-up")
export class SignUpController extends Controller {
  private signUpService: OtpHandler<
    OtpType,
    {
      firstName: string;
      lastName: string;
      password: string;
    }
  >;
  constructor() {
    super();
    this.signUpService = container.resolve<
      OtpHandler<
        OtpType,
        {
          firstName: string;
          lastName: string;
          password: string;
        }
      >
    >("otpRegistrationService");
  }

  @Middlewares([validateZodSchemaMiddleware(requestOtpBodySchema)])
  @Post("request-otp")
  public async requestOtpForSignUp(
    @Body()
    {
      identifier,
    }: {
      identifier: string;
    },
    @Request() req: ExpressRequestType
  ) {
    try {
      const token = await this.signUpService.request({
        identifier,
      });
      return token;
    } catch (error) {
      console.log("error", error);
      if (error instanceof AuthError) {
        throw errorMapper(error, authErrorMapping);
      }

      throw error;
    }
  }

  @Middlewares([validateZodSchemaMiddleware(verifyOtpBodySchema)])
  @Post("verify-otp")
  public async verifyOtpForLocalSignUp(
    @Body()
    {
      otp,
    }: {
      otp: string;
    },
    @Request() req: ExpressRequestType
  ) {
    const token = req.headers["authorization"]?.replace("Bearer ", "") || "";
    try {
      return await this.signUpService.verify({ otp, token });
    } catch (error) {
      if (error instanceof AuthError) {
        throw errorMapper(error, authErrorMapping);
      }

      throw error;
    }
  }

  @Middlewares([validateZodSchemaMiddleware(otpSignUpBodySchema)])
  @Post()
  public async signUp(
    @Body()
    { firstName, lastName, password }: OtpSignUpInput,
    @Request() req: ExpressRequestType
  ) {
    const token = req.headers["authorization"]?.replace("Bearer ", "") || "";
    try {
      const result = await this.signUpService.execute({
        data: { firstName, lastName, password },
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
}
