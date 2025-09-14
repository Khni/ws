import { OtpModel } from "../../repositories/interfaces/IOtpRepository.js";

export type CreateOtpData<OtpType> = {
  recipient: string;
  otpType: OtpType;
};
export interface ICreateOtpService<OtpType> {
  execute({}: {
    data: CreateOtpData<OtpType>;
  }): Promise<{ otpRecord: OtpModel<OtpType>; generatedOtp: string }>;
}
