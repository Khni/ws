import { AuthUnexpectedError } from "../errors/AuthUnexpectedError.js";
import { IHasher } from "../hasher/IHasher.js";
import { IOtpRepository } from "../repositories/interfaces/IOtpRepository.js";
import {
  CreateOtpData,
  ICreateOtpService,
} from "./interfaces/ICreateOtpService.js";
import { IOtpSenderStrategy } from "./interfaces/IOtpSenderStrategy.js";

export class CreateOtpService<OtpType> implements ICreateOtpService<OtpType> {
  constructor(
    private otpRepository: IOtpRepository<OtpType>,
    private hasher: IHasher,
    private expiresIn: number, //in seconds
    private otpSenderStrategy: IOtpSenderStrategy,
    private otpConfig: { min: number; max: number } = {
      min: 101101,
      max: 989989,
    }
  ) {
    if (this.otpConfig.min > otpConfig.max) {
      throw new Error("Min value cannot be greater than max value");
    }
  }
  private generate = () => {
    const min = Math.ceil(this.otpConfig.min);
    const max = Math.floor(this.otpConfig.min);
    return (Math.floor(Math.random() * (max - min + 1)) + min).toString();
  };

  private getExpiresAt = () => {
    return new Date(Date.now() + this.expiresIn * 1000);
  };
  async execute({ data }: { data: CreateOtpData<OtpType> }) {
    try {
      const generatedOtp = this.generate();
      const hashedOtp = await this.hasher.hash(generatedOtp.toString());
      const expiresAt = this.getExpiresAt();

      const otpRecord = await this.otpRepository.create({
        data: {
          expiresAt,
          hashedOtp,
          identifier: data.recipient,
          type: data.otpType,
        },
      });

      await this.otpSenderStrategy.send({
        expiresIn: this.expiresIn,
        generatedOtp,
        otpType: data.otpType as string,
        recipient: data.recipient,
      });

      return { otpRecord, generatedOtp };
    } catch (error) {
      throw new AuthUnexpectedError("OTP_CREATION_FAILED", error);
    }
  }
}
