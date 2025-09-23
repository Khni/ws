import {
  IOtpSenderContext,
  OtpSendParams,
} from "./interfaces/IOtpSenderContext.js";
import { IOtpSenderStrategy } from "./interfaces/IOtpSenderStrategy.js";

export class OtpSenderContext implements IOtpSenderContext {
  constructor(private strategy: IOtpSenderStrategy[]) {}

  async send(params: OtpSendParams): Promise<void> {
    const strategy = this.strategy.find((s) => s.name === params.senderType);
    if (strategy) {
      return await strategy.send({
        expiresIn: params.expiresIn,
        otpType: params.otpType,
        recipient: params.recipient,
        generatedOtp: params.generatedOtp,
      });
    } else {
      return Promise.reject(new Error("No strategy found for sender type"));
    }
  }
}
