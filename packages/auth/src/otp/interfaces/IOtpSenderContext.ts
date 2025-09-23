import { OtpSenderType } from "../types.js";

export type OtpSendParams = {
  expiresIn: number;
  otpType: string;
  recipient: string;
  generatedOtp: string;
  senderType: OtpSenderType;
};
export interface IOtpSenderContext {
  send(params: OtpSendParams): Promise<void>;
}
