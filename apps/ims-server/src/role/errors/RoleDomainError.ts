import { RoleDomainErrorCodesType } from "@khaled/ims-shared";
import { RoleError } from "./RoleError.js";

export class RoleDomainError extends RoleError {
  constructor(code: RoleDomainErrorCodesType, msg?: string, meta?: {}) {
    super({
      code,
      name: "RoleDomainError",
      logLevel: "warn",
      message: msg || code,
      meta,
    });

    Object.setPrototypeOf(this, RoleDomainError.prototype);
  }
}
