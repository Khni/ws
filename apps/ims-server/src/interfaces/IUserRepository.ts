import { IBaseRepository } from "@khaled/auth";
import { Prisma, User } from "../../generated/prisma/client.js";

export interface IUserRepository
  extends IBaseRepository<
    User,
    Prisma.UserWhereUniqueInput,
    Prisma.UserCreateInput
  > {}
