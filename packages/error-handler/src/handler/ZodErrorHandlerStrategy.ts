import { Response } from "express";
import { ZodError } from "zod";

import { IErrorHandlingStrategy } from "./interfaces/IErrorHandlingStrategy.js";
import { ILogger } from "../errors/types.js";
import { IZodErrorSerializer } from "../serializers/interfaces/IZodErrorSerializer.js";

export class ZodErrorhandlerStrategy implements IErrorHandlingStrategy {
  constructor(
    private zodErrorSerializer: IZodErrorSerializer,
    private logger?: ILogger
  ) {}

  canHandle(err: Error): boolean {
    return err instanceof ZodError;
  }

  handle(err: Error, res: Response): void {
    const zodError = err as ZodError;

    if (this.logger) {
      this.logger.warn(
        "ZodError",
        this.zodErrorSerializer.serializeError(zodError)
      );
    }

    const formattedErrors = this.zodErrorSerializer.serializeResponse(zodError);

    res.status(400).json(formattedErrors);
  }
}
