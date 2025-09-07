import { beforeEach, describe, expect, it, vi } from "vitest";
import { IErrorHandlingStrategy } from "../interfaces/IErrorHandlingStrategy.js";
import { ZodErrorhandlerStrategy } from "../ZodErrorHandlerStrategy.js";
import { mockZodErrorSerializer } from "../../serializers/interfaces/mocks.js";

// import { zodErrorConstructor, serializeErrorReturnValue } from "./data.js";
// import { mockLogger, mockResponse } from "../mocks.js";
import type { Response } from "express";
import { ZodError } from "zod";
import { mockLogger, mockResponse } from "../mocks.js";
describe("ZodErrorHandlerStrategy", () => {
  let zodErrorHandlerStrategy: IErrorHandlingStrategy;
  let res: Response;

  beforeEach(() => {
    vi.clearAllMocks();
    zodErrorHandlerStrategy = new ZodErrorhandlerStrategy(
      mockZodErrorSerializer
    );

    res = mockResponse();
  });
  class ZodErrorInstance extends ZodError {}
  it("return true from canHandle if ZodError instance is passed", () => {
    expect(
      zodErrorHandlerStrategy.canHandle(
        new ZodError([
          { path: [], message: "Something went wrong", code: "custom" },
        ])
      )
    ).toBe(true);
  });
  it("return false from canHandle if ZodError instance is passed", () => {
    expect(zodErrorHandlerStrategy.canHandle(new Error())).toBe(false);
  });

  it("call res.status and res.json and not call zodErrorSerializer.serializerError and log[logLevel] when logger is not passed when creating ZodErrorStrategyHandler instance ", () => {
    mockZodErrorSerializer.serializeResponse.mockReturnValue({
      name: "InputValidationError",
      errors: [
        {
          field: "email",
          messages: ["email is required"],
        },
      ],
    });
    zodErrorHandlerStrategy.handle(
      new ZodErrorInstance([
        { path: [], message: "Something went wrong", code: "custom" },
      ]),
      res
    );

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      name: "InputValidationError",
      errors: [
        {
          field: "email",
          messages: ["email is required"],
        },
      ],
    });
    expect(mockZodErrorSerializer.serializeError).not.toHaveBeenCalled();
    expect(mockLogger.warn).not.toHaveBeenCalled();
  });

  it("call zodErrorSerializer.serializerError and log[logLevel] when logger is passed when creating ZodErrorStrategyHandler instance", () => {
    const zodErrorHandlerStrategyWithLogger = new ZodErrorhandlerStrategy(
      mockZodErrorSerializer,
      mockLogger
    );
    mockZodErrorSerializer.serializeResponse.mockReturnValue({
      name: "InputValidationError",
      errors: [
        {
          field: "email",
          messages: ["email is required"],
        },
      ],
    });
    mockZodErrorSerializer.serializeError.mockReturnValue([
      {
        path: "email",
        message: "email is required",
        code: "invalid_arguments",
      },
    ]);
    zodErrorHandlerStrategyWithLogger.handle(
      new ZodErrorInstance([
        { path: [], message: "Something went wrong", code: "custom" },
      ]),
      res
    );

    expect(mockZodErrorSerializer.serializeError).toHaveBeenCalled();
    expect(mockLogger.warn).toHaveBeenCalled();
  });
});
