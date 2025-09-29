import { describe, beforeEach, it, expect, vi, Mocked } from "vitest";
import { CreateOtpService } from "../CreateOtpService.js";
import { AuthUnexpectedError } from "../../errors/AuthUnexpectedError.js";
import { mockOtpRepository } from "../../repositories/interfaces/mocks.js";
import { mockHasher } from "../../hasher/mocks.js";
import { mockOtpSenderStrategy } from "../interfaces/mocks.js";
import { fakeOtpRecord } from "./data.js";
import { generateExpiredDate, ValidTimeString } from "@khaled/utils";

describe("CreateOtpService", () => {
  let createOtpService: CreateOtpService<
    "FORGET_PASSWORD" | "VERIFY_EMAIL" | "VERIFY_PHONE"
  >;
  const validTimeString: ValidTimeString = "10m";
  beforeEach(() => {
    vi.clearAllMocks();
    createOtpService = new CreateOtpService(
      mockOtpRepository,
      generateExpiredDate,
      { FORGET_PASSWORD: "10m" },
      mockOtpSenderStrategy,
      { min: 100, max: 200 },
      mockHasher
    );
  });

  it("should throw if min > max in otpConfig", () => {
    expect(
      () =>
        new CreateOtpService(
          mockOtpRepository,
          generateExpiredDate,
          { FORGET_PASSWORD: "10m" },
          mockOtpSenderStrategy,
          { min: 200, max: 100 },
          mockHasher
        )
    ).toThrowError("Min value cannot be greater than max value");
  });

  it("should generate OTP, hash it, store it, send it and return values", async () => {
    // Arrange
    const fakeOtp = "123456";
    const fakeHashedOtp = "hashed_123456";

    const generateSpy = vi
      .spyOn<any, any>(createOtpService, "generate")
      .mockReturnValue(fakeOtp);
    const expiresAtSpy = vi
      .spyOn<any, any>(createOtpService, "getExpiresAt")
      .mockReturnValue(new Date("2025-01-01T00:00:00.000Z"));

    (mockHasher.hash as Mocked<typeof mockHasher.hash>).mockResolvedValue(
      fakeHashedOtp
    );
    (
      mockOtpRepository.create as Mocked<typeof mockOtpRepository.create>
    ).mockResolvedValue(fakeOtpRecord);

    // Act
    const result = await createOtpService.execute({
      data: {
        otpType: "VERIFY_EMAIL",
        recipient: "test@example.com",
        senderType: "email",
      },
    });

    // Assert
    expect(generateSpy).toHaveBeenCalledTimes(1);
    expect(mockHasher.hash).toHaveBeenCalledWith(fakeOtp);
    expect(mockOtpRepository.create).toHaveBeenCalledWith({
      data: expect.objectContaining({
        hashedOtp: fakeHashedOtp,
        identifier: "test@example.com",
        type: "VERIFY_EMAIL",
        expiresAt: new Date("2025-01-01T00:00:00.000Z"),
      }),
    });
    expect(mockOtpSenderStrategy.send).toHaveBeenCalledWith({
      expiresIn: 60 * 5,
      generatedOtp: fakeOtp,
      otpType: "VERIFY_EMAIL",
      recipient: "test@example.com",
    });

    expect(result).toEqual({ otpRecord: fakeOtpRecord, generatedOtp: fakeOtp });

    // Cleanup spies
    generateSpy.mockRestore();
    expiresAtSpy.mockRestore();
  });

  it("should handle error during OTP creation and wrap in AuthUnexpectedError", async () => {
    (
      mockOtpRepository.create as Mocked<typeof mockOtpRepository.create>
    ).mockRejectedValue(new Error("DB error"));

    await expect(
      createOtpService.execute({
        data: {
          otpType: "VERIFY_PHONE",
          recipient: "+15551234567",
          senderType: "email",
        },
      })
    ).rejects.toThrow(AuthUnexpectedError);
  });

  it("should still work when min === max (always generate same OTP)", async () => {
    const service = new CreateOtpService(
      mockOtpRepository,
      generateExpiredDate,
      { FORGET_PASSWORD: "10m" },
      mockOtpSenderStrategy,
      { min: 123456, max: 123456 },
      mockHasher
    );

    const otp = service["generate"]();
    expect(otp).toBe("123456");
  });
});
