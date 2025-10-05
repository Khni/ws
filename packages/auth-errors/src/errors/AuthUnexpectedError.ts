import { AuthError } from "./AuthError.js";
import { AuthUnexpectedErrorCodesType } from "./errors.js";

export class AuthUnexpectedError extends AuthError {
  constructor(
    code: AuthUnexpectedErrorCodesType,
    cause: unknown,
    msg?: string,
    meta?: {}
  ) {
    super({
      code,
      name: "AuthUnexpectedError",
      logLevel: "error",
      message: msg || code,
      cause,
      meta,
    });

    Object.setPrototypeOf(this, AuthUnexpectedError.prototype);
  }
}
