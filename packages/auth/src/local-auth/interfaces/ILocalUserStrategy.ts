import {
  UserModel,
  UserUpdateInput,
} from "../../repositories/interfaces/IUserRepository.js";

export type CreateUserStrategyParams = {
  firstName: string;
  lastName: string;
  password: string;
  identifier: string;
  verified: boolean;
};

export type UpdateUserStrategyParams = {
  data: UserUpdateInput;
  identifier: string;
};

export type FindUserStrategyParams = { identifier: string };
export interface ILocalUserStrategy {
  name: string;
  find(params: FindUserStrategyParams): Promise<UserModel | null>;
  create(params: CreateUserStrategyParams): Promise<UserModel>;
  update(params: UpdateUserStrategyParams): Promise<UserModel>;
}
