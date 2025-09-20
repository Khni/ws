import { ILogger } from "../errors/types.js";
import { HttpErrorSerializer } from "../serializers/HttpErrorSerializer.js";
import { ZodErrorSerializer } from "../serializers/ZodErrorSerializer.js";
import { ErrorHandler } from "./ErrorHandlerContext.js";
import { FallbackErrorStrategy } from "./FallBackErrorHandlerStrategy.js";
import { HttpErrorHandlerStrategy } from "./HttpErrorHandlerStrategy.js";
import { InputValidationErrorHandlerStrategy } from "./InputValidationErrorHandlerStrategy.js";

import { ZodErrorhandlerStrategy } from "./ZodErrorHandlerStrategy.js";

export const createErrHandlerMiddleware = (logger?: ILogger) =>
  new ErrorHandler([
    new HttpErrorHandlerStrategy(new HttpErrorSerializer(), logger),
    new InputValidationErrorHandlerStrategy(logger),
    new ZodErrorhandlerStrategy(new ZodErrorSerializer(), logger),
    new FallbackErrorStrategy(logger),
  ]).handle;
