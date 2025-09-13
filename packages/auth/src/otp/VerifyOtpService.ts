import { AuthDomainError } from "../errors/AuthDomainError.js";
import { AuthUnexpectedError } from "../errors/AuthUnexpectedError.js";
import { IHasher } from "../hasher/IHasher.js";
import { IOtpRepository } from "../repositories/interfaces/IOtpRepository.js";

export class VerifyOtpService<OtpType> implements VerifyOtpService<OtpType> {
  constructor(
    private otpRepository: IOtpRepository<OtpType>,
    private hasher: IHasher
  ) {}

  async execute({
    userId,
    otp,
    type,
  }: {
    userId: string;
    otp: string;
    type: OtpType;
  }) {
    try {
      const otpRecord = await this.otpRepository.findFirst({
        where: { userId, type },
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
