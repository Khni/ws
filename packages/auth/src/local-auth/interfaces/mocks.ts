import { Mocked, vi } from "vitest";
import { ILocalUserStrategy } from "./ILocalUserStrategy.js";

export const mockUserEmailStrategy: Mocked<ILocalUserStrategy> = {
  create: vi.fn(),
  find: vi.fn(),
  name: "email",
  update: vi.fn(),
};

export const mockUserPhoneStrategy: Mocked<ILocalUserStrategy> = {
  create: vi.fn(),
  find: vi.fn(),
  name: "phone",
  update: vi.fn(),
};
