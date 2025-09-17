import { BaseCreateUserData } from "../types.js";

export interface ILocalAuthService<
  UserType,
  CreateDataType extends BaseCreateUserData = BaseCreateUserData,
> {
  createUser(params: { data: CreateDataType }): Promise<UserType>;
  verifyPassword: ({
    data,
  }: {
    data: {
      password: string;
      identifier: string;
    };
  }) => Promise<UserType | null>;
  resetPassword({
    data,
  }: {
    data: {
      newPassword: string;
      identifier: string;
    };
  }): Promise<UserType | null>;

  findUserByIdentifier: (identifier: string) => Promise<UserType | null>;
}
