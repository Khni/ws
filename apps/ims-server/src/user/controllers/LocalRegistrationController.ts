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
  localRegistrationRequestOtpSchema,
  localRegistrationVerifyOtpSchema,
  loginBodySchema,
  registerBodySchema,
  resetForgettenPasswordBodySchema,
  type ResetForgettenPasswordInput,
} from "@khaled/ims-shared";
import { localRegistrationWithOtp } from "../services/localRegistrationWithOtp.js";
import { OtpType } from "../../../generated/prisma/index.js";
import container from "../../container.js";

@Tags("forget-password")
@Route("forget-password")
export class LocalRegistrationController extends Controller {
  private localRegistrationService: OtpHandler<
    OtpType,
    {
      firstName: string;
      lastName: string;
      password: string;
    }
  >;
  constructor() {
    super();
    this.localRegistrationService = container.resolve<
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

  @Middlewares([validateZodSchemaMiddleware(localRegistrationRequestOtpSchema)])
  @Post("request-otp")
  public async requestOtpForLocalRegistration(
    @Body()
    {
      identifier,
    }: {
      identifier: { type: "email" | "phone"; value: string }; //this will be added by zod
    },
    @Request() req: ExpressRequestType
  ) {
    try {
      const token = await this.localRegistrationService.request({
        identifier: identifier.value,
        senderType: identifier.type === "email" ? "email" : "sms",
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

  @Middlewares([validateZodSchemaMiddleware(localRegistrationVerifyOtpSchema)])
  @Post("verify-otp")
  public async verifyOtpForLocalRegistration(
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
      return await this.localRegistrationService.verify({ otp, token });
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
      return await this.localRegistrationService.execute({
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
