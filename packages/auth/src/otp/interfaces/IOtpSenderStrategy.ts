import { OtpSenderType } from "../types.js";
import { OtpSendParams } from "./IOtpSenderContext.js";

export interface IOtpSenderStrategy {
  name: OtpSenderType;
  send(params: Omit<OtpSendParams, "senderType">): Promise<void>;
}
