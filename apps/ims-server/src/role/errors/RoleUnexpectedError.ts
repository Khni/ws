import { RoleUnexpectedErrorCodesType } from "@khaled/ims-shared";
import { RoleError } from "./RoleError.js";

export class RoleUnexpectedError extends RoleError {
  constructor(
    code: RoleUnexpectedErrorCodesType,
    cause: unknown,
    msg?: string,
    meta?: {}
  ) {
    super({
      code,
      name: "RoleUnexpectedError",
      logLevel: "error",
      message: msg || code,
      cause,
      meta,
    });

    Object.setPrototypeOf(this, RoleUnexpectedError.prototype);
  }
}
