import { OrganizationDomainErrorCodesType } from "./errors.js";
import { OrganizationError } from "./OrganizationError.js";

export class OrganizationDomainError extends OrganizationError {
  constructor(code: OrganizationDomainErrorCodesType, msg?: string, meta?: {}) {
    super({
      code,
      name: "OrganizationDomainError",
      logLevel: "warn",
      message: msg || code,
      meta,
    });

    Object.setPrototypeOf(this, OrganizationDomainError.prototype);
  }
}
