export type CreateUserStrategyParams = {
  firstName: string;
  lastName: string;
  password: string;
  identifier: string;
  verified: boolean;
};

export type UpdateUserStrategyParams<UserModel> = {
  data: Partial<UserModel>;
  identifier: string;
};

export type FindUserStrategyParams = { identifier: string };
export interface ILocalUserStrategy<UserModel> {
  name: string;
  find(params: FindUserStrategyParams): Promise<UserModel | null>;
  create(params: CreateUserStrategyParams): Promise<UserModel>;
  update(params: UpdateUserStrategyParams<UserModel>): Promise<UserModel>;
}
