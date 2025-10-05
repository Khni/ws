import { HttpError } from "../errors/HttpError.js";
import { ErrorResponse } from "../errors/types.js";
import { IHttpErrorSerializer } from "./interfaces/IHttpErrorSerializer.js";

export class HttpErrorSerializer implements IHttpErrorSerializer {
  constructor() {}
  private flattenErrorCauses(error: HttpError): Array<Record<string, any>> {
    const result: Array<Record<string, any>> = [];
    let current: unknown = error;
    let count = 0;
    while (current instanceof Error && current.cause && count < 100) {
      current = current.cause;

      if (current instanceof Error) {
        const causeInfo: Record<string, any> = {
          name: current.name,
          message: current.message,
          stack: current.stack,
        };

        // Copy other useful fields if present (code, responseMessage, etc.)
        if ("code" in current) causeInfo.code = (current as any).code;
        if ("responseMessage" in current)
          causeInfo.responseMessage = (current as any).responseMessage;
        if ("meta" in current) causeInfo.meta = (current as any).meta;

        result.push(causeInfo);
      }
      count++;
    }

    return result;
  }

  serializerError = (error: HttpError) => {
    const fullErrorChain = this.flattenErrorCauses(error);
    return {
      topLevel: {
        name: error.name,
        message: error.message,
        code: error.code,
        logLevel: error.logLevel,
        responseMessage: error.responseMessage,
        meta: error.meta,
        stack: error.stack,
      },
      causeChain: fullErrorChain,
    };
  };

  serializeResponse = (error: HttpError) => {
    const err: ErrorResponse<unknown> = {
      errorType: "Server",
      error: {
        message: error.responseMessage,
        code: error.code,
        name: error.name,
      },
    };
    return err;
  };
}
