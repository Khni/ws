import { AuthDomainError, AuthDomainErrorCodes } from "@khaled/auth-errors";
import { IdentifierType, OtpType } from "../../../generated/prisma/index.js";
import container from "../../container.js";
import { IUserService } from "@khaled/auth";
import { UserType } from "../types.js";

export const callBackBeforeRequestOtp = (
  userService: IUserService<UserType, any>
) => {
  return async ({
    identifier,
    otpType,
  }: {
    identifier: string;
    otpType: OtpType;
  }) => {
    const user = await userService.findByIdentifier({ identifier });
    if (otpType === "SIGN_UP" && user) {
      throw new AuthDomainError(
        AuthDomainErrorCodes.AUTH_USED_IDENTIFIER,
        `identifier: ${user.identifierType} is in used,  ${otpType} OTP can not be generated`
      );
    }
    if ((otpType === "FORGET_PASSWORD" || otpType === "LOGIN") && !user) {
      throw new AuthDomainError(
        AuthDomainErrorCodes.USER_IS_NOT_EXIST,
        `User is not in Database, ${otpType} OTP can not be generated`
      );
    }
    if (otpType === "FORGET_PASSWORD" && !user?.password) {
      throw new AuthDomainError(
        "USER_NOT_LOCAL",
        `identifier: ${user?.identifierType}: ${identifier} is missing a local password, FORGET_PASSWORD OTP can not be generated`
      );
    }
  };
};
