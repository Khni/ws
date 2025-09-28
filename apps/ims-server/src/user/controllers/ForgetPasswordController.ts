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
import { AuthError, authErrorMapping } from "@khaled/auth";
import { errorMapper } from "@khaled/error-handler";

import { validateZodSchemaMiddleware } from "../../core/schema/validateZodErrorMiddleware.js";

import {
  requestOtpBodySchema,
  resetForgettenPasswordBodySchema,
  verifyOtpBodySchema,
  type ResetForgettenPasswordInput,
} from "@khaled/ims-shared";

import container from "../../container.js";

@Tags("forget-password")
@Route("forget-password")
export class ForgetPasswordController extends Controller {
  private forgetPasswordService = container.resolve("otpForgetPasswordService");
  constructor() {
    super();
  }

  @Middlewares([validateZodSchemaMiddleware(requestOtpBodySchema)])
  @Post("request-otp")
  public async requestOtpForForgetPassword(
    @Body()
    {
      identifier,
    }: {
      identifier: string; //this will be added by zod
    },
    @Request() req: ExpressRequestType
  ) {
    try {
      const token = await this.forgetPasswordService.request({
        identifier,
      });
      return token;
    } catch (error) {
      if (error instanceof AuthError) {
        throw errorMapper(error, authErrorMapping);
      }

      throw error;
    }
  }

  @Middlewares([validateZodSchemaMiddleware(verifyOtpBodySchema)])
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
  @Post()
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
