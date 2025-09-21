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
  }) => Promise<UserType>;
  resetPassword({
    data,
  }: {
    data: {
      newPassword: string;
      identifier: string;
    };
  }): Promise<UserType>;

  findUserByIdentifier: (identifier: string) => Promise<UserType | null>;
}
