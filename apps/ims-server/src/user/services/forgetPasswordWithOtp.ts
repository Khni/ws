import {
  IOtpSenderStrategy,
  LocalAuthService,
  otpHandler,
  OtpSenderContext,
} from "@khaled/auth";
import { OtpType } from "../../../generated/prisma/index.js";
import { OtpMailSender } from "../../core/otp/OtpMailSender.js";
import { config } from "../../config/envSchema.js";
import { OtpRepository } from "../repositories/OtpRepository.js";
import { IOtpRepository } from "../interfaces/IOtpRepository .js";
import { LocalAuth } from "./LocalAuthService.js";

export const forgetPasswordWithOtp = () => {
  const otpSenderStrategy: IOtpSenderStrategy[] = [new OtpMailSender()];
  const otpSenderContext = new OtpSenderContext(otpSenderStrategy);
  const resetPasssword = new LocalAuth().resetPassword;
  return otpHandler<
    OtpType,
    Omit<Parameters<typeof resetPasssword>[0], "identifier">
  >({
    otpType: "FORGET_PASSWORD",
    otpSenderContext,
    jwtSecret: config.JWT_SECRET,
    otpRepository: new OtpRepository() as IOtpRepository,
    expiresIn: 10 * 60,
    executeFn: resetPasssword,
  });
};
