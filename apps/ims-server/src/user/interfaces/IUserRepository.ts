import { IBaseRepository } from "@khaled/auth";
import { Prisma, User } from "../../../generated/prisma/index.js";

export interface IUserRepository
  extends IBaseRepository<
    User,
    Prisma.UserWhereUniqueInput,
    Prisma.UserCreateInput
  > {}
