import { CustomError, CustomErrorConstructor } from "@khaled/error-handler";
import { OrganizationErrorCodesType } from "./errors.js";

export class OrganizationError extends CustomError<OrganizationErrorCodesType> {
  constructor(
    error: CustomErrorConstructor<OrganizationErrorCodesType> & { name: string }
  ) {
    super(error);

    Object.setPrototypeOf(this, OrganizationError.prototype);
  }
}
