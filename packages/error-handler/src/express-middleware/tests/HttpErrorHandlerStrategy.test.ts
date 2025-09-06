import { beforeEach, describe, expect, it, vi } from "vitest";
import { IErrorHandlingStrategy } from "../interfaces/IErrorHandlingStrategy.js";
import { HttpErrorHandlerStrategy } from "../HttpErrorHandlerStrategy.js";
import { mockHttpErrorSerializer } from "../../serializers/interfaces/mocks.js";
import { HttpError } from "../../errors/HttpError.js";
import { httpErrorConstructor } from "./data.js";
import { mockResponse } from "../mocks.js";
import type { Response } from "express";
describe("HttpErrorHandlerStrategy", () => {
  let httpErrorHandlerStrategy: IErrorHandlingStrategy;
  let res: Response;

  beforeEach(() => {
    vi.clearAllMocks();
    httpErrorHandlerStrategy = new HttpErrorHandlerStrategy(
      mockHttpErrorSerializer
    );

    res = mockResponse();
  });
  class HttpErrorInstance extends HttpError {
    statusCode = 500;
  }
  it("return true from canHandle if HttpError instance is passed", () => {
    expect(
      httpErrorHandlerStrategy.canHandle(
        new HttpErrorInstance(httpErrorConstructor)
      )
    ).toBe(true);
  });
  it("return false from canHandle if HttpError instance is passed", () => {
    expect(httpErrorHandlerStrategy.canHandle(new Error())).toBe(false);
  });

  it("call res.status and res.json", () => {
    mockHttpErrorSerializer.serializeResponse.mockReturnValue({
      message: "message",
      code: "code",
      name: "name",
    });
    httpErrorHandlerStrategy.handle(
      new HttpErrorInstance(httpErrorConstructor),
      res
    );
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: "message",
      code: "code",
      name: "name",
    });
  });
});
