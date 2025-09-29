import { z } from "zod";
import {
  LocalLoginInput,
  LocalRegisterInput,
  RefreshTokenInput,
  OtpEnum,
  ForgetPasswordRequestOtpInput,
  ForgetPasswordVerifyOtpInput,
  ResetForgettenPasswordInput,
  OtpSignUpInput,
} from "../types/index.js";

const identifier = z.union([
  z.e164().transform((val) => ({ type: "phone" as const, value: val })),
  z.email().transform((val) => ({ type: "email" as const, value: val })),
]);
export const registerBodySchema: z.ZodType<
  Omit<LocalRegisterInput, "identifier"> & {
    identifier: { type: "email" | "phone"; value: string };
  },
  LocalRegisterInput
> = z.object({
  identifier,

  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .max(20, { message: "Password must be at most 20 characters" }),

  firstName: z
    .string()
    .min(2, { message: "First name must be at least 2 characters" }),

  lastName: z
    .string()
    .min(2, { message: "Last name must be at least 2 characters" }),
});

export const otpSignUpBodySchema: z.ZodType<OtpSignUpInput, OtpSignUpInput> =
  z.object({
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" })
      .max(20, { message: "Password must be at most 20 characters" }),

    firstName: z
      .string()
      .min(2, { message: "First name must be at least 2 characters" }),

    lastName: z
      .string()
      .min(2, { message: "Last name must be at least 2 characters" }),
  });

export type RegisterBodySchemaType = z.infer<typeof registerBodySchema>;

export const loginBodySchema: z.ZodType<
  Omit<LocalLoginInput, "identifier"> & {
    identifier: { type: "email" | "phone"; value: string };
  },
  LocalLoginInput
> = z.object({
  identifier,
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .max(20, { message: "Password must be at most 20 characters" }),
});
export type LoginBodySchemaType = z.infer<typeof loginBodySchema>;

//forget password
export const forgetPasswordRequestOtpSchema: z.ZodType<
  ForgetPasswordRequestOtpInput,
  ForgetPasswordRequestOtpInput
> = z.object({
  identifier: z.object({
    type: z.enum(["email", "phone"]),
    value: z.string(),
  }),
});
export type forgetPasswordRequestOtpType = z.infer<
  typeof forgetPasswordRequestOtpSchema
>;

export const forgetPasswordVerifyOtpSchema: z.ZodType<
  ForgetPasswordVerifyOtpInput,
  ForgetPasswordVerifyOtpInput
> = z.object({
  otp: z.string().min(6, "OTP must be at least 6 characters"),
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

export const OAuthParamsCodeSchema = z.object({
  query: z.object({
    code: z.string(),
  }),
});
