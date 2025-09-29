import { OtpSenderType } from "../types.js";

export type OtpStrategySendParams = {
  timeValue: number;
  timeUnit: string;
  otpType: string;
  recipient: string;
  generatedOtp: string;
};
export interface IOtpSenderStrategy {
  name: OtpSenderType;
  send(params: OtpStrategySendParams): Promise<void>;
}
