import { ValidTimeString } from "@khaled/utils";
import { OtpSenderType } from "../types.js";

export type OtpSendParams = {
  timeString: ValidTimeString;
  otpType: string;
  recipient: string;
  generatedOtp: string;
  senderType: OtpSenderType;
};
export interface IOtpSenderContext {
  send(params: OtpSendParams): Promise<void>;
}
