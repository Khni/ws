import { describe, it, expect } from "vitest";
import * as indexExports from "./index.js"; // adjust path if needed

describe("index.ts exports", () => {
  it("should export HttpError and CustomError classes", () => {
    expect(indexExports.HttpError).toBeTypeOf("function");
    expect(indexExports.CustomError).toBeTypeOf("function");
  });

  it("should export factory function(s)", () => {
    // Adjust according to what your factory exports

    expect(indexExports.createErrHandlerMiddleware).toBeTypeOf("function");
  });

  it("should export errorMapper", () => {
    expect(indexExports.errorMapper).toBeTypeOf("function");
  });
});
