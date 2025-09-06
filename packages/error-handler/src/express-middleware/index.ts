import { ILogger } from "../errors/types.js";
import { HttpErrorSerializer } from "../serializers/HttpErrorSerializer.js";
import { ZodErrorSerializer } from "../serializers/ZodErrorSerializer.js";
import { ErrorHandler } from "./ErrorHandlerContext.js";
import { FallbackErrorStrategy } from "./FallBackErrorHandlerStrategy.js";
import { HttpErrorStrategy } from "./HttpErrorHandlerStrategy.js";

import { ZodErrorStrategy } from "./ZodErrorHandlerStrategy.js";

export const createErrHandlerMiddleware = (logger?: ILogger) =>
  new ErrorHandler([
    new HttpErrorStrategy(new HttpErrorSerializer(), logger),
    new ZodErrorStrategy(new ZodErrorSerializer(), logger),
    new FallbackErrorStrategy(logger),
  ]).handle;
