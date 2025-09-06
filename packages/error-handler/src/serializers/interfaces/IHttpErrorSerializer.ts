import { HttpError } from "../../errors/HttpError.js";
import { LogLevel } from "../../errors/types.js";

export interface IHttpErrorSerializer {
  serializerError: (error: HttpError) => {
    topLevel: {
      name: string;
      message: string;
      code: unknown;
      logLevel: LogLevel;
      responseMessage: string;
      meta: {} | undefined;
      stack: string | undefined;
    };
    causeChain: Record<string, any>[];
  };
  serializeResponse: (error: HttpError) => {
    message: string;
    code: unknown;
    name: string;
  };
}
