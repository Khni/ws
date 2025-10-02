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

@Tags("otp")
@Route("otp")
export class OtpController extends Controller {
  private otpService = container.resolve("otpHandler");
  constructor() {
    super();
  }

  @Middlewares([
    validateZodSchemaMiddleware({ bodySchema: requestOtpBodySchema }),
  ])
  @Post("request")
  public async requestOtp(
    @Body()
    {
      otpType,
      identifier,
    }: {
      identifier: string;
      otpType: OtpType;
    },
    @Request() req: ExpressRequestType
  ) {
    try {
      const token = await this.otpService.request({
        otpType,
        identifier,
      });
      return { token };
    } catch (error) {
      if (error instanceof AuthError) {
        throw errorMapper(error, authErrorMapping);
      }

      throw error;
    }
  }

  @Middlewares([
    validateZodSchemaMiddleware({ bodySchema: verifyOtpBodySchema }),
  ])
  @Post("verify")
  public async verifyOtp(
    @Body()
    {
      otpType,
      otp,
    }: {
      otp: string;
      otpType: OtpType;
    },
    @Request() req: ExpressRequestType
  ): Promise<{ token: string }> {
    const authToken =
      req.headers["authorization"]?.replace("Bearer ", "") || "";
    try {
      const token = await this.otpService.verify({
        otp,
        token: authToken,
        otpType,
      });
      return { token };
    } catch (error) {
      if (error instanceof AuthError) {
        throw errorMapper(error, authErrorMapping);
      }

      throw error;
    }
  }
}
