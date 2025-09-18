import { IBaseRepository } from "@khaled/auth";
import { Prisma, RefreshToken, User } from "../../../generated/prisma/index.js";

export interface IRefreshTokenRepository
  extends IBaseRepository<
    RefreshToken,
    Prisma.RefreshTokenWhereUniqueInput,
    Prisma.RefreshTokenCreateInput
  > {}
