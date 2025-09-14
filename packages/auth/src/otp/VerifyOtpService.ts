import { AuthDomainError } from "../errors/AuthDomainError.js";
import { AuthUnexpectedError } from "../errors/AuthUnexpectedError.js";
import { IHasher } from "../hasher/IHasher.js";
import { IOtpRepository } from "../repositories/interfaces/IOtpRepository.js";
import { IVerifyOtpService } from "./interfaces/IVerifyOtpService.js";

export class VerifyOtpService<OtpType> implements IVerifyOtpService<OtpType> {
  constructor(
    private otpRepository: IOtpRepository<OtpType>,
    private hasher: IHasher
  ) {}

  async execute({
    identifier,
    otp,
    type,
  }: {
    identifier: string;
    otp: string;
    type: OtpType;
  }) {
    try {
      const otpRecord = await this.otpRepository.findFirst({
        where: { identifier, type },
        orderBy: { createdAt: "desc" },
      });

      if (!otpRecord) {
        throw new AuthDomainError("OTP_INVALID");
      }

      const isOtpValid = await this.hasher.compare(otp, otpRecord.hashedOtp);
      if (!isOtpValid) {
        throw new AuthDomainError("OTP_INVALID");
      }

      if (otpRecord.expiresAt < new Date()) {
        throw new AuthDomainError("OTP_EXPIRED");
      }

      return true;
    } catch (error) {
      if (error instanceof AuthDomainError) {
        throw error;
      }
      throw new AuthUnexpectedError("OTP_VERIFICATION_FAILED", error);
    }
  }
}
