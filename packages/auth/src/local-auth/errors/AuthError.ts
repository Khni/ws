import { CustomError, CustomErrorConstructor } from "@khaled/error-handler";
import { AuthErrorCodesType } from "./errors.js";

export class AuthError extends CustomError<AuthErrorCodesType> {
  constructor(
    error: CustomErrorConstructor<AuthErrorCodesType> & { name: string }
  ) {
    super(error);

    Object.setPrototypeOf(this, AuthError.prototype);
  }
}
