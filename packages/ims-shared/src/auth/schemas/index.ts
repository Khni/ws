import { z } from "zod";
import {
  RefreshTokenInput,
  OtpEnum,
  ResetForgettenPasswordInput,
  OtpSignUpInput,
  LocalLoginInput,
  SocialLoginParamsType,
} from "../types/index.js";

export const otpSignUpBodySchema: z.ZodType<OtpSignUpInput, OtpSignUpInput> =
  z.object({
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" })
      .max(20, { message: "Password must be at most 20 characters" }),

    name: z.string().min(2, { message: " name must be at least 2 characters" }),
  });

export const loginBodySchema: z.ZodType<LocalLoginInput, LocalLoginInput> =
  z.object({
    identifier: z.union([z.e164(), z.email()]),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" })
      .max(20, { message: "Password must be at most 20 characters" }),
  });

export const refreshTokenBodySchema: z.ZodType<RefreshTokenInput> = z.object({
  refreshToken: z
    .string()
    .length(80, "Refresh token must be 80 characters long")
    .optional(),
});

export const resetForgettenPasswordBodySchema: z.ZodType<
  ResetForgettenPasswordInput,
  ResetForgettenPasswordInput
> = z
  .object({
    newPassword: z.string().min(6, "Password must be at least 6 characters"),
    confirmNewPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords do not match",
    path: ["confirmNewPassword"], // the error will show on confirmNewPassword
  });

/**
 * OTP
 */
export const requestOtpBodySchema = z.object({
  identifier: z.union([z.e164(), z.email()]),
  otpType: z.enum(OtpEnum),
});

export const verifyOtpBodySchema = z.object({
  otpType: z.enum(OtpEnum),
  otp: z.string().min(6),
});

/**
 * OAuth
 */

export const SocialLoginParamsSchema: z.ZodType<
  SocialLoginParamsType,
  SocialLoginParamsType
> = z.object({
  code: z.string(),
});
