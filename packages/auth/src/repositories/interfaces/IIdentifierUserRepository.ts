import { IBaseRepository } from "./IBaseRepository.js";
type Subset<T> =
  | {
      [K in keyof T]: Pick<T, K>;
    }[keyof T]
  | T;
export type UserModel = {
  id: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  verified: boolean;
  oauthProvider: "NONE" | "FACEBOOK" | "GOOGLE";
  identifier: string;
  identifierType: "email" | "phone" | "username";
  oauthId: string | null;
  password: string | null; //null for social user
};

export type UserUpdateInput = Partial<UserModel>;

export type UserWhereUniqueInput = { identifier: string } | { id: string };

export interface IIdentifierUserRepository<
  Model extends UserModel = UserModel,
  UserCreateInput extends Subset<Model> = Model,
> extends IBaseRepository<Model, UserWhereUniqueInput, UserCreateInput> {}
