import { OtpModel } from "../../repositories/interfaces/IOtpRepository.js";

export const fakeOtpRecord: OtpModel<"VERIFY_EMAIL"> = {
  id: "otp-id-123",
  isActive: true,
  createdAt: new Date("2025-01-01T00:00:00.000Z"),
  updatedAt: new Date("2025-01-01T00:00:00.000Z"),
  identifier: "user-123",
  expiresAt: new Date("2025-01-01T00:05:00.000Z"),
  type: "VERIFY_EMAIL",
  hashedOtp: "hashed_123456",
};
