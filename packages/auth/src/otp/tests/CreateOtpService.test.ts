import { describe, beforeEach, it, expect, vi, Mocked } from "vitest";
import { CreateOtpService } from "../CreateOtpService.js";
import { AuthUnexpectedError } from "../../errors/AuthUnexpectedError.js";
import { mockOtpRepository } from "../../repositories/interfaces/mocks.js";
import { mockHasher } from "../../hasher/mocks.js";
import { mockOtpSenderStrategy } from "../interfaces/mocks.js";
import { fakeOtpRecord } from "./data.js";

describe("CreateOtpService", () => {
  let createOtpService: CreateOtpService<
    "FORGET_PASSWORD" | "VERIFY_EMAIL" | "VERIFY_PHONE"
  >;

  beforeEach(() => {
    vi.clearAllMocks();
    createOtpService = new CreateOtpService(
      mockOtpRepository,
      mockHasher,
      60 * 5,
      mockOtpSenderStrategy
    );
  });

  it("should throw if min > max in otpConfig", () => {
    expect(
      () =>
        new CreateOtpService(
          mockOtpRepository,
          mockHasher,
          60,
          mockOtpSenderStrategy,
          { min: 200, max: 100 }
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
        userId: "user-123",
        otpType: "VERIFY_EMAIL",
        recipient: "test@example.com",
      },
    });

    // Assert
    expect(generateSpy).toHaveBeenCalledTimes(1);
    expect(mockHasher.hash).toHaveBeenCalledWith(fakeOtp);
    expect(mockOtpRepository.create).toHaveBeenCalledWith({
      data: expect.objectContaining({
        hashedOtp: fakeHashedOtp,
        userId: "user-123",
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
          userId: "user-123",
          otpType: "VERIFY_PHONE",
          recipient: "+15551234567",
        },
      })
    ).rejects.toThrow(AuthUnexpectedError);
  });

  it("should still work when min === max (always generate same OTP)", async () => {
    const service = new CreateOtpService(
      mockOtpRepository,
      mockHasher,
      60,
      mockOtpSenderStrategy,
      { min: 123456, max: 123456 }
    );

    const otp = service["generate"]();
    expect(otp).toBe("123456");
  });
});
