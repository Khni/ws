import { CustomError, CustomErrorConstructor } from "@khaled/error-handler";
import { RoleErrorCodesType } from "@khaled/ims-shared";

export class RoleError extends CustomError<RoleErrorCodesType> {
  constructor(
    error: CustomErrorConstructor<RoleErrorCodesType> & { name: string }
  ) {
    super(error);

    Object.setPrototypeOf(this, RoleError.prototype);
  }
}
