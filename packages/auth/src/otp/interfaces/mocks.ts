import { Mocked, vi } from "vitest";
import { IOtpSenderContext } from "./IOtpSenderContext.js";

export const mockOtpSenderStrategy: Mocked<IOtpSenderContext> = {
  send: vi.fn(),
};
