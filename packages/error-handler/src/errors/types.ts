export type LogLevel = "debug" | "info" | "warn" | "error";

export type CustomErrorConstructor<CodeType> = {
  message: string;
  meta?: {};
  code: CodeType;
  logLevel: LogLevel;
  cause?: unknown;
};
export type HttpErrorConstructor = CustomErrorConstructor<unknown> & {
  responseMessage: string;
  name: string;
};
