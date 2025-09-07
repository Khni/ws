import { describe, it, expect } from "vitest";

import type { ZodIssue } from "zod";
import { ZodErrorSerializer } from "../ZodErrorSerializer.js";

describe("ZodErrorSerializer", () => {
  const mockIssues = [
    {
      code: "invalid_type",
      message: "Expected string, received number",
      path: ["body", "username"],
    },
    {
      code: "too_small",
      message: "Must be at least 3 characters",
      path: ["body", "username"],
    },
    {
      code: "invalid_type",
      message: "Expected number, received string",
      path: ["body", "age"],
    },
  ];

  const mockZodError = {
    issues: mockIssues,
  } as any; // Simulate ZodError

  it("should serialize individual issues correctly", () => {
    const serializer = new ZodErrorSerializer();

    const result = serializer.serializeError(mockZodError);
    expect(result).toEqual([
      {
        path: "body.username",
        message: "Expected string, received number",
        code: "invalid_type",
      },
      {
        path: "body.username",
        message: "Must be at least 3 characters",
        code: "too_small",
      },
      {
        path: "body.age",
        message: "Expected number, received string",
        code: "invalid_type",
      },
    ]);
  });

  it("should group messages by path and strip 'body.' prefix in serializeResponse", () => {
    const serializer = new ZodErrorSerializer();

    const result = serializer.serializeResponse(mockZodError);

    expect(result).toEqual({
      name: "inputValidationError",
      errors: [
        {
          field: "username",
          messages: [
            "Expected string, received number",
            "Must be at least 3 characters",
          ],
        },
        {
          field: "age",
          messages: ["Expected number, received string"],
        },
      ],
    });
  });

  it("should return an empty array when there are no issues", () => {
    const serializer = new ZodErrorSerializer();

    const emptyError = { issues: [] } as any;
    expect(serializer.serializeError(emptyError)).toEqual([]);
    expect(serializer.serializeResponse(emptyError)).toEqual({
      name: "inputValidationError",
      errors: [],
    });
  });
});
