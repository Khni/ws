import { Mocked, vi } from "vitest";
import { IOtpSenderStrategy } from "./IOtpSenderStrategy.js";

export const mockOtpSenderStrategy: Mocked<IOtpSenderStrategy> = {
  send: vi.fn(),
};
