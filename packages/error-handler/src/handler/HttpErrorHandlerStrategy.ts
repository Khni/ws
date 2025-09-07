import type { Response } from "express";

import { IErrorHandlingStrategy } from "./interfaces/IErrorHandlingStrategy.js";
import { HttpError } from "../errors/HttpError.js";
import { ILogger } from "../errors/types.js";
import { IHttpErrorSerializer } from "../serializers/interfaces/IHttpErrorSerializer.js";

export class HttpErrorHandlerStrategy implements IErrorHandlingStrategy {
  constructor(
    private httpErrorSerializer: IHttpErrorSerializer,
    private logger?: ILogger
  ) {}

  canHandle(err: Error): boolean {
    return err instanceof HttpError;
  }

  handle(err: Error, res: Response): void {
    const error = err as HttpError;
    if (this.logger) {
      this.logger[error.logLevel](
        "HttpError",
        this.httpErrorSerializer.serializerError(error)
      );
    }

    res
      .status(error.statusCode)
      .json(this.httpErrorSerializer.serializeResponse(error));
  }
}
