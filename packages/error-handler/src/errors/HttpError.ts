import { HttpErrorConstructor, LogLevel } from "./types.js";

export abstract class HttpError extends Error {
  abstract statusCode: number;
  public code: unknown;
  public logLevel: LogLevel;
  public meta?: {};
  public responseMessage: string;

  constructor({
    name,
    message,
    meta,
    code,
    logLevel,
    cause,
    responseMessage,
  }: HttpErrorConstructor & { responseMessage: string }) {
    super(message);
    this.name = name;
    this.message = message;
    this.meta = meta;
    this.code = code;
    this.logLevel = logLevel;
    this.cause = cause;
    this.responseMessage = responseMessage;

    Object.setPrototypeOf(this, new.target.prototype); // preserve prototype chain
  }
}
