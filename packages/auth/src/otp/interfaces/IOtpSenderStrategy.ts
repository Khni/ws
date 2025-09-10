export type OtpSendParams = {
  expiresIn: number;
  otpType: string;
  recipient: string;
  generatedOtp: string;
};
export interface IOtpSenderStrategy {
  send(params: OtpSendParams): Promise<void>;
}
