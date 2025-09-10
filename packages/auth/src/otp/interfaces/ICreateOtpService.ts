import { OtpModel } from "../../repositories/interfaces/IOtpRepository.js";
export type sendType = "email" | "phone" | "whatsapp" | "telegram";
export type CreateOtpData<OtpType> = {
  recipient: string;
  otpType: OtpType;
  userId: string;
};
export interface ICreateOtpService {
  execute<OtpType>({}: {
    sendType: sendType;
    data: CreateOtpData<OtpType>;
  }): Promise<OtpModel<OtpType>>;
}
