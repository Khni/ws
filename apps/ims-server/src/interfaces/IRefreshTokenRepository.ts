import { Prisma } from "../../generated/prisma/index.js";

export type RefreshToken = {
  id: string;
  userId: string;
  token: string;
  expiresAt: Date;
  userAgent?: string | null;
  ipAddress?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
  revokedAt?: Date | null;
};

export interface IRefreshTokenRepository {
  create(data: {
    userId: string;
    expiresAt: Date;
    token: string;
    userAgent?: string;
    ipAddress?: string;
  }): Promise<RefreshToken>;

  find(params: { token: string }): Promise<RefreshToken | null>;

  delete(params: {
    token?: string;
    userId?: string;
    id?: string;
  }): Promise<number>;
  update(params: {
    where: Prisma.RefreshTokenWhereUniqueInput;
    data: Prisma.RefreshTokenUpdateInput;
  }): Promise<{
    token: string;
    id: string;
    revokedAt: Date | null;
  }>;
}
