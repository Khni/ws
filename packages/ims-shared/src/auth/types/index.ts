export type LocalRegisterInput = {
  identifier: string;
  password: string;
  name: string;
};
export type OtpSignUpInput = {
  password: string;
  name: string;
};
export type LocalLoginInput = {
  identifier: string;
  password: string;
};

export type ResetForgettenPasswordInput = {
  newPassword: string;
  confirmNewPassword: string;
};

export type RefreshTokenInput = {
  refreshToken?: string;
};

export type RefreshTokenResponse = {
  accessToken: string;
};

/**
 * OTP
 */
export const OtpEnum = {
  SIGN_UP: "SIGN_UP",
  LOGIN: "LOGIN",
  FORGET_PASSWORD: "FORGET_PASSWORD",
};
export type OtpType = keyof typeof OtpEnum;
export type CreateOtpBodyType = {
  email: string;
  type: OtpType;
};
export type VerifyOtpBodyType = {
  email: string;
  type: OtpType;
  otp: string;
};

/**
 * OAUTH
 */

export type OAuthParamsCode = {
  code: string;
};
