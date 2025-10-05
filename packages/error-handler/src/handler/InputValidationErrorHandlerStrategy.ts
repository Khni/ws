import type { Response } from "express";

import { IErrorHandlingStrategy } from "./interfaces/IErrorHandlingStrategy.js";
import { InputValidationError } from "../errors/InputValidationError.js";
import { ErrorResponse, ILogger } from "../errors/types.js";

export class InputValidationErrorHandlerStrategy
  implements IErrorHandlingStrategy
{
  constructor(private logger?: ILogger) {}

  canHandle(err: Error): boolean {
    return err instanceof InputValidationError;
  }

  handle(err: Error, res: Response): void {
    const error = err as InputValidationError;
    if (this.logger) {
      this.logger.warn("InputValidationError", error);
    }
    const inputValidationError: ErrorResponse<unknown> = {
      errorType: "InputValidation",
      error,
    };

    res.status(400).json(inputValidationError);
  }
}
