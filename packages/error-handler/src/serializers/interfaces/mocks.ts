import { Mocked, vi } from "vitest";

import { IHttpErrorSerializer } from "./IHttpErrorSerializer.js";
import { IZodErrorSerializer } from "./IZodErrorSerializer.js";

export const mockHttpErrorSerializer: Mocked<IHttpErrorSerializer> = {
  serializerError: vi.fn(),
  serializeResponse: vi.fn(),
};
export const mockZodErrorSerializer: Mocked<IZodErrorSerializer> = {
  serializeError: vi.fn(),
  serializeResponse: vi.fn(),
};
