import { IOtpSenderStrategy, LocalAuthService, otpHandler } from "@khaled/auth";
import { OtpType } from "../../../generated/prisma/index.js";
import { OtpMailSender } from "../../core/otp/OtpMailSender.js";
import { config } from "../../config/envSchema.js";
import { OtpRepository } from "../repositories/OtpRepository.js";
import { IOtpRepository } from "../interfaces/IOtpRepository .js";
import { LocalAuth } from "./LocalAuthService.js";

export const forgetPasswordWithOtp = ({
  identifierType,
  otpRep = new OtpRepository(),
}: {
  identifierType: "email" | "phone";
  otpRep?: IOtpRepository;
}) => {
  let otpSenderStrategy: IOtpSenderStrategy;
  if (identifierType === "email") {
    otpSenderStrategy = new OtpMailSender();
  } else if (identifierType === "phone") {
    throw new Error("Phone OTP sender not implemented yet");
  } else {
    throw new Error("Invalid identifier type");
  }
  const resetPasssword = new LocalAuth().resetPassword;
  return otpHandler<OtpType, Parameters<typeof resetPasssword>[0]>({
    otpType: "FORGET_PASSWORD",
    otpSenderStrategy,
    jwtSecret: config.JWT_SECRET,
    otpRepository: otpRep,
    expiresIn: 10 * 60,
    executeFn: resetPasssword,
  });
};
