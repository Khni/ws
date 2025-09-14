import { IBaseRepository } from "./IBaseRepository.js";

type UserBaseModel = {
  id: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  verified: boolean;
  oauthProvider: "NONE" | "FACEBOOK" | "GOOGLE";
  oauthId: string | null;
  password: string | null; //null for social user
};
export type UserModel = {
  email: string | null;
  phone: string | null;
  username?: string;
  firstName: string;
  lastName: string;

  picture: string | null;
} & UserBaseModel;

type UserCreateInputBase = Partial<UserModel> & {
  firstName: string;
  lastName: string;
  password: string | null;
};
export type UserCreateInput =
  | (UserCreateInputBase & { email: string })
  | (UserCreateInputBase & { phone: string });

export type UserUpdateInput = Partial<UserModel>;

export type UserWhereUniqueInput =
  | { email: string }
  | { id: string }
  | { phone: string };

export interface IUserRepository
  extends IBaseRepository<UserModel, UserWhereUniqueInput, UserCreateInput> {}
