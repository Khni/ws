import { OrganizationUnexpectedErrorCodesType } from "./errors.js";
import { OrganizationError } from "./OrganizationError.js";

export class OrganizationUnexpectedError extends OrganizationError {
  constructor(
    code: OrganizationUnexpectedErrorCodesType,
    cause: unknown,
    msg?: string,
    meta?: {}
  ) {
    super({
      code,
      name: "OrganizationUnexpectedError",
      logLevel: "error",
      message: msg || code,
      cause,
      meta,
    });

    Object.setPrototypeOf(this, OrganizationUnexpectedError.prototype);
  }
}
