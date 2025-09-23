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
import { AuthError, authErrorMapping, RefreshTokenCookie } from "@khaled/auth";
import { errorMapper, InputValidationError } from "@khaled/error-handler";

import { config } from "../../config/envSchema.js";
import { validateBodySchema } from "../../utils/schema/validateBodySchemaMiddleware.js";
import { ZodError } from "zod";
import { validateZodSchemaMiddleware } from "../../core/schema/validateZodErrorMiddleware.js";
import { zodErrorSerializer } from "../../core/schema/ZodErrorSerializer.js";
import {
  forgetPasswordRequestOtpSchema,
  loginBodySchema,
  registerBodySchema,
} from "@khaled/ims-shared";
import { forgetPasswordWithOtp } from "../services/forgetPasswordWithOtp.js";

@Tags("forget-password")
@Route("forget-password")
export class ForgetPasswordController extends Controller {
  constructor() {
    super();
  }

  @Middlewares([validateZodSchemaMiddleware(forgetPasswordRequestOtpSchema)])
  @Post("request-otp")
  @SuccessResponse("201", "Created")
  public async requestOtpForForgetPassword(
    @Body()
    body: {
      identifier: { type: "email" | "phone"; value: string }; //this will be added by zod
    },
    @Request() req: ExpressRequestType
  ) {
    const forgetPassword = forgetPasswordWithOtp({
      identifierType: body.identifier.type,
    });
    try {
      const token = await forgetPassword.request({
        identifier: body.identifier.value,
      });
      return token;
    } catch (error) {
      if (error instanceof AuthError) {
        throw errorMapper(error, authErrorMapping);
      }

      throw error;
    }
  }
}
