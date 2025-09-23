import { OtpModel } from "../../repositories/interfaces/IOtpRepository.js";
import { OtpSenderType } from "../types.js";

export type CreateOtpData<OtpType> = {
  recipient: string;
  otpType: OtpType;
  senderType: OtpSenderType;
};
export interface ICreateOtpService<OtpType> {
  execute({}: {
    data: CreateOtpData<OtpType>;
  }): Promise<{ otpRecord: OtpModel<OtpType>; generatedOtp: string }>;
}
