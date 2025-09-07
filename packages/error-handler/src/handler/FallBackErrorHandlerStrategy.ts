import { Response } from "express";

import { IErrorHandlingStrategy } from "./interfaces/IErrorHandlingStrategy.js";

import { ILogger } from "../errors/types.js";

export class FallbackErrorStrategy implements IErrorHandlingStrategy {
  constructor(private logger?: ILogger) {}

  canHandle(err: Error): boolean {
    return true; // always applies if no other does
  }

  log = (error: any) => {
    if (this.logger) {
      this.logger.error("UnexpectedError" + error.name, {
        topLevel: {
          name: error.name,
          message: error.message,
          code: error.code,
          meta: error.meta,
          stack: error.stack,
        },
      });
    }
  };

  handle(err: Error, res: Response): void {
    this.log(err);

    res
      .status(500)
      .json({
        code: "UNKNOWN_ERROR",
        message: "An Expected error occurred.",
        name: "unknown",
      });
  }
}
