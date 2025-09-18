import {
  IUserRepository,
  UserCreateInput,
  UserUpdateInput,
  UserWhereUniqueInput,
} from "../user/interfaces/IUserRepository.js";
import prisma from "../database/prisma.js";
import { User } from "../../generated/prisma/index.js";
export class UserRepository implements IUserRepository {
  create = async (data: UserCreateInput) => {
    try {
      return await prisma.user.create({
        data,
      });
    } catch (error) {
      throw new Error(
        `Database Error while creating new user email: ${data.email} `,
        {
          cause: error,
        }
      );
    }
  };
  findUnique = async (where: UserWhereUniqueInput) => {
    try {
      const user = await prisma.user.findUnique({
        where,
      });
      return user;
    } catch (error) {
      throw new Error(`Database Error while finding user where: ${where} `, {
        cause: error,
      });
    }
  };

  update = async (where: UserWhereUniqueInput, data: UserUpdateInput) => {
    try {
      const user = await prisma.user.update({
        where,
        data,
      });
      return user;
    } catch (error) {
      throw new Error(`Database Error while updating user where: ${where} `, {
        cause: error,
      });
    }
  };
}
