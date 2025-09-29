import { ValidTimeString } from "@khaled/utils";
import { AuthUnexpectedError } from "../errors/AuthUnexpectedError.js";
import { BcryptHasher } from "../hasher/BcryptHasher.js";
import { IHasher } from "../hasher/IHasher.js";
import { IOtpRepository } from "../repositories/interfaces/IOtpRepository.js";
import {
  CreateOtpData,
  ICreateOtpService,
} from "./interfaces/ICreateOtpService.js";
import { IOtpSenderContext } from "./interfaces/IOtpSenderContext.js";
import { OtpTypeToOtpExpiresInMapping } from "./types.js";

export class CreateOtpService<OtpType extends string>
  implements ICreateOtpService<OtpType>
{
  constructor(
    private otpRepository: IOtpRepository<OtpType>,

    private generateExpiredDate: (timeString: ValidTimeString) => Date,
    private otpTypeToOtpExpiresInMapping: OtpTypeToOtpExpiresInMapping<OtpType>,
    private otpSenderContext: IOtpSenderContext,
    private otpConfig: { min: number; max: number },
    private hasher: IHasher = new BcryptHasher()
  ) {
    if (this.otpConfig.min > this.otpConfig.max) {
      throw new Error("Min value cannot be greater than max value");
    }
  }
  private generate = () => {
    const min = Math.ceil(this.otpConfig.min);
    const max = Math.floor(this.otpConfig.max);
    return (Math.floor(Math.random() * (max - min + 1)) + min).toString();
  };

  private getExpiresAt = ({ otpType }: { otpType: OtpType }) => {
    return this.generateExpiredDate(this.otpTypeToOtpExpiresInMapping[otpType]);
  };
  async execute({ data }: { data: CreateOtpData<OtpType> }) {
    try {
      const generatedOtp = this.generate();
      const hashedOtp = await this.hasher.hash(generatedOtp.toString());
      const expiresAt = this.getExpiresAt({ otpType: data.otpType });

      const otpRecord = await this.otpRepository.create({
        data: {
          expiresAt,
          hashedOtp,
          identifier: data.recipient,
          type: data.otpType,
        },
      });

      await this.otpSenderContext.send({
        timeString: this.otpTypeToOtpExpiresInMapping[data.otpType],
        generatedOtp,
        otpType: data.otpType as string,
        recipient: data.recipient,
        senderType: data.senderType,
      });

      return { otpRecord, generatedOtp };
    } catch (error) {
      throw new AuthUnexpectedError("OTP_CREATION_FAILED", error);
    }
  }
}
