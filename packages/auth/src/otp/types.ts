import { ValidTimeString } from "@khaled/utils";

export type OtpSenderType = "email" | "sms" | "whatsapp";
export type OtpTypeToOtpTokenExpiresInMapping<
  OtpType extends string | number | symbol,
> = {
  [keys in OtpType]: ValidTimeString;
};

export type OtpTypeToOtpExpiresInMapping<
  OtpType extends string | number | symbol,
> = {
  [keys in OtpType]: ValidTimeString;
};
