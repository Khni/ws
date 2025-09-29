import { ValidTimeString } from "@khaled/utils";
import {
  IOtpSenderContext,
  OtpSendParams,
} from "./interfaces/IOtpSenderContext.js";
import { IOtpSenderStrategy } from "./interfaces/IOtpSenderStrategy.js";

export class OtpSenderContext implements IOtpSenderContext {
  constructor(
    private otpSenderStrategies: IOtpSenderStrategy[],
    private parseTimeString: (input: ValidTimeString) => {
      timeValue: number;
      humanReadable: string;
    }
  ) {}

  async send(params: OtpSendParams): Promise<void> {
    const strategy = this.otpSenderStrategies.find(
      (s) => s.name === params.senderType
    );
    if (strategy) {
      const { timeValue, humanReadable } = this.parseTimeString(
        params.timeString
      );
      return await strategy.send({
        timeUnit: humanReadable,
        timeValue: timeValue,
        otpType: params.otpType,
        recipient: params.recipient,
        generatedOtp: params.generatedOtp,
      });
    } else {
      return Promise.reject(new Error("No strategy found for sender type"));
    }
  }
}
