import { UserModel } from "../../repositories/interfaces/IUserRepository.js";
import { AuthIdentifierType } from "../types/index.js";
import { CreateUserStrategyParams } from "./ILocalUserStrategy.js";

export interface ILocalAuthContext {
  createUser: ({
    data,
    authIdentifierType,
  }: {
    authIdentifierType: AuthIdentifierType;
    data: CreateUserStrategyParams;
  }) => Promise<UserModel>;

  verifyPassword: ({
    data,
    authIdentifierType,
  }: {
    authIdentifierType: AuthIdentifierType;
    data: {
      password: string;
      identifier: string;
    };
  }) => Promise<UserModel>;
  resetPassword({
    data,
    authIdentifierType,
  }: {
    authIdentifierType: AuthIdentifierType;
    data: {
      newPassword: string;
      identifier: string;
    };
  }): Promise<UserModel>;
}
