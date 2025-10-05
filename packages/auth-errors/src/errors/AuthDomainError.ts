import { AuthError } from "./AuthError.js";
import { AuthDomainErrorCodesType } from "./errors.js";

export class AuthDomainError extends AuthError {
  constructor(code: AuthDomainErrorCodesType, msg?: string, meta?: {}) {
    super({
      code,
      name: "AuthDomainError",
      logLevel: "warn",
      message: msg || code,
      meta,
    });

    Object.setPrototypeOf(this, AuthDomainError.prototype);
  }
}
