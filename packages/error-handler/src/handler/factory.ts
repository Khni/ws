import { ILogger } from "../errors/types.js";
import { HttpErrorSerializer } from "../serializers/HttpErrorSerializer.js";

import { ErrorHandler } from "./ErrorHandlerContext.js";
import { FallbackErrorStrategy } from "./FallBackErrorHandlerStrategy.js";
import { HttpErrorHandlerStrategy } from "./HttpErrorHandlerStrategy.js";
import { InputValidationErrorHandlerStrategy } from "./InputValidationErrorHandlerStrategy.js";

export const createErrHandlerMiddleware = (logger?: ILogger) =>
  new ErrorHandler([
    new HttpErrorHandlerStrategy(new HttpErrorSerializer(), logger),
    new InputValidationErrorHandlerStrategy(logger),

    new FallbackErrorStrategy(logger),
  ]).handle;
