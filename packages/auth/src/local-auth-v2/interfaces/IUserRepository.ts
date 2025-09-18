import { BaseCreateUserData } from "../types.js";

export interface IUserService<
  UserType extends BaseCreateUserData,
  CreateDataType extends BaseCreateUserData = BaseCreateUserData,
> {
  // Find user by identifier (can be extended later)
  findByIdentifier(params: { identifier: string }): Promise<UserType | null>;

  // Create user with validated + hashed data
  create(params: CreateDataType): Promise<UserType>;
  update(params: {
    data: Partial<UserType>;
    identifier: string;
  }): Promise<UserType | null>;
}
