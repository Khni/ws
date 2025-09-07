import type { NextFunction, Response, Request } from "express";

import { IErrorHandlingStrategy } from "./interfaces/IErrorHandlingStrategy.js";

export class ErrorHandler {
  constructor(private strategies: IErrorHandlingStrategy[]) {}

  public handle = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
  ): void => {
    const strategy = this.strategies.find((s) => s.canHandle(err));

    if (strategy) {
      strategy.handle(err, res);
    } else {
      // Optional: If no strategy found (shouldn't happen if Fallback is included)

      res.status(500).json({
        code: "UNKNOWN_ERROR",
        message: "An Expected error occurred.",
        name: "unknown",
      });
    }
  };
}
