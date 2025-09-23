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

import type { Request as ExpressRequestType, Response } from "express";
import {
  AuthError,
  authErrorMapping,
  OtpHandler,
  RefreshTokenCookie,
} from "@khaled/auth";
import { errorMapper, InputValidationError } from "@khaled/error-handler";

import { config } from "../../config/envSchema.js";
import { validateBodySchema } from "../../utils/schema/validateBodySchemaMiddleware.js";
import { ZodError } from "zod";
import { validateZodSchemaMiddleware } from "../../core/schema/validateZodErrorMiddleware.js";
import { zodErrorSerializer } from "../../core/schema/ZodErrorSerializer.js";
import {
  forgetPasswordRequestOtpSchema,
  forgetPasswordVerifyOtpSchema,
  loginBodySchema,
  registerBodySchema,
  resetForgettenPasswordBodySchema,
  type ResetForgettenPasswordInput,
} from "@khaled/ims-shared";
import { forgetPasswordWithOtp } from "../services/forgetPasswordWithOtp.js";
import { OtpType } from "../../../generated/prisma/index.js";

@Tags("forget-password")
@Route("forget-password")
export class ForgetPasswordController extends Controller {
  private forgetPasswordService: OtpHandler<
    OtpType,
    {
      newPassword: string;
    }
  >;
  constructor() {
    super();
    this.forgetPasswordService = forgetPasswordWithOtp();
  }

  @Middlewares([validateZodSchemaMiddleware(forgetPasswordRequestOtpSchema)])
  @Post("request-otp")
  public async requestOtpForForgetPassword(
    @Body()
    {
      identifier,
    }: {
      identifier: { type: "email" | "phone"; value: string }; //this will be added by zod
    },
    @Request() req: ExpressRequestType
  ) {
    try {
      const token = await this.forgetPasswordService.request({
        identifier: identifier.value,
        senderType: identifier.type === "email" ? "email" : "sms",
      });
      return token;
    } catch (error) {
      if (error instanceof AuthError) {
        throw errorMapper(error, authErrorMapping);
      }

      throw error;
    }
  }

  @Middlewares([validateZodSchemaMiddleware(forgetPasswordVerifyOtpSchema)])
  @Post("verify-otp")
  public async verifyOtpForForgetPassword(
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
      return await this.forgetPasswordService.verify({ otp, token });
    } catch (error) {
      if (error instanceof AuthError) {
        throw errorMapper(error, authErrorMapping);
      }

      throw error;
    }
  }

  @Middlewares([validateZodSchemaMiddleware(resetForgettenPasswordBodySchema)])
  @Post("reset")
  public async resetForgettenPassword(
    @Body()
    { newPassword }: ResetForgettenPasswordInput,
    @Request() req: ExpressRequestType
  ) {
    const token = req.headers["authorization"]?.replace("Bearer ", "") || "";
    try {
      return await this.forgetPasswordService.execute({
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
