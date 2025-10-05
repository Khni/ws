import { describe, beforeEach, it, expect, vi } from "vitest";
import { VerifyOtpService } from "../VerifyOtpService.js";
import { AuthDomainError } from "@khaled/auth-errors";
import { AuthUnexpectedError } from "@khaled/auth-errors";
import { mockOtpRepository } from "../../repositories/interfaces/mocks.js";
import { mockHasher } from "../../hasher/mocks.js";
import { fakeOtpRecord } from "./data.js";
import { IVerifyOtpService } from "../interfaces/IVerifyOtpService.js";
import { mockToken } from "../../token/mocks.js";

describe("VerifyOtpService", () => {
  let verifyOtpService: IVerifyOtpService<any>;

  const identifier = "user-123@gmail.com";
  const otp = "123456";
  const type = "VERIFY_EMAIL";

  beforeEach(() => {
    vi.clearAllMocks();
    verifyOtpService = new VerifyOtpService(mockOtpRepository, mockHasher);
  });

  it("✅ should return true when OTP is valid and not expired", async () => {
    mockOtpRepository.findFirst.mockResolvedValue({
      ...fakeOtpRecord,
      expiresAt: new Date(Date.now() + 300 * 1000),
    });
    mockHasher.compare.mockResolvedValue(true);
    mockToken.sign.mockReturnValue("fake-token");

    const result = await verifyOtpService.execute({ identifier, otp, type });

    expect(result).toEqual({ token: "fake-token" });
    expect(mockOtpRepository.findFirst).toHaveBeenCalledWith({
      where: { identifier, type },
      orderBy: { createdAt: "desc" },
    });
    expect(mockHasher.compare).toHaveBeenCalledWith(
      otp,
      fakeOtpRecord.hashedOtp
    );
  });

  it("❌ should throw OTP_INVALID when no OTP record exists", async () => {
    mockOtpRepository.findFirst.mockResolvedValue(null);

    await expect(
      verifyOtpService.execute({ identifier, otp, type })
    ).rejects.toThrowError(new AuthDomainError("OTP_INVALID"));
  });

  it("❌ should throw OTP_INVALID when OTP does not match", async () => {
    mockOtpRepository.findFirst.mockResolvedValue(fakeOtpRecord);
    mockHasher.compare.mockResolvedValue(false);

    await expect(
      verifyOtpService.execute({ identifier, otp, type })
    ).rejects.toThrowError(new AuthDomainError("OTP_INVALID"));
  });

  it("❌ should throw OTP_EXPIRED when OTP is expired", async () => {
    const expiredOtpRecord = {
      ...fakeOtpRecord,
      expiresAt: new Date("2000-01-01T00:00:00.000Z"), // already expired
    };
    mockOtpRepository.findFirst.mockResolvedValue(expiredOtpRecord);
    mockHasher.compare.mockResolvedValue(true);

    await expect(
      verifyOtpService.execute({ identifier, otp, type })
    ).rejects.toThrowError(new AuthDomainError("OTP_EXPIRED"));
  });

  it("❌ should wrap unexpected repository error into AuthUnexpectedError", async () => {
    mockOtpRepository.findFirst.mockRejectedValue(new Error("DB crash"));

    await expect(
      verifyOtpService.execute({ identifier, otp, type })
    ).rejects.toThrowError(AuthUnexpectedError);
  });

  it("❌ should wrap unexpected hasher error into AuthUnexpectedError", async () => {
    mockOtpRepository.findFirst.mockResolvedValue(fakeOtpRecord);
    mockHasher.compare.mockRejectedValue(new Error("Hasher crash"));

    await expect(
      verifyOtpService.execute({ identifier, otp, type })
    ).rejects.toThrowError(AuthUnexpectedError);
  });
});
