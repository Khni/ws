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

export interface IUserRepository {
  create(params: { data: UserCreateInput; tx?: unknown }): Promise<UserModel>;

  update(params: {
    data: UserUpdateInput;
    where: UserWhereUniqueInput;
    tx?: unknown;
  }): Promise<UserModel>;

  findMany(params: {
    offset: number;
    limit: number;
    orderBy?: Partial<Record<keyof UserModel, "asc" | "desc">>;
    where?: Partial<UserModel>;
  }): Promise<UserModel[]>;

  delete(params: {
    where: UserWhereUniqueInput;
    tx?: unknown;
  }): Promise<{ id: string }>;

  findUnique(params: {
    where: UserWhereUniqueInput;
  }): Promise<UserModel | null>;

  count(params?: { where?: Partial<UserModel> }): Promise<number>;
  createTransaction<T>(callback: (tx: unknown) => Promise<T>): Promise<T>;
}
