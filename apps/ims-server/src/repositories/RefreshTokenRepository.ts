import { Prisma } from "../../generated/prisma/index.js";
import prisma from "../database/prisma.js";
import {
  IRefreshTokenRepository,
  RefreshToken,
} from "../user/interfaces/IRefreshTokenRepository.js";

export class RefreshTokenRepository implements IRefreshTokenRepository {
  async create(input: {
    userId: string;
    expiresAt: Date;
    userAgent?: string;
    ipAddress?: string;
    token: string;
  }): Promise<RefreshToken> {
    const { userId, expiresAt, userAgent, ipAddress, token } = input;
    const data = { userId, expiresAt, userAgent, ipAddress, token };
    try {
      const refreshToken = await prisma.refreshToken.create({
        data,
      });
      return refreshToken;
    } catch (error) {
      throw new Error(
        `Database Error while creating refresh token for userId: ${data.userId}`,
        { cause: error }
      );
    }
  }

  async find(params: { token: string }): Promise<RefreshToken | null> {
    const { token } = params;

    try {
      if (!token) {
        return null;
      }
      const refreshToken = await prisma.refreshToken.findUnique({
        where: {
          token,
        },
      });

      return refreshToken;
    } catch (error) {
      throw new Error(`Database Error while finding refresh token `, {
        cause: error,
      });
    }
  }

  async delete(params: {
    token?: string;
    userId?: string;
    id?: string;
  }): Promise<number> {
    try {
      const result = await prisma.refreshToken.deleteMany({
        where: {
          ...(params.token && { token: params.token }),
          ...(params.userId && { userId: params.userId }),
          ...(params.id && { id: params.id }),
        },
      });
      return result.count;
    } catch (error) {
      throw new Error(
        `Database Error while deleting refresh token(s) with params: ${JSON.stringify(
          params
        )}`,
        { cause: error }
      );
    }
  }

  async update(params: {
    where: Prisma.RefreshTokenWhereUniqueInput;
    data: Prisma.RefreshTokenUpdateInput;
  }) {
    const refreshToken = await prisma.refreshToken.update({
      where: params.where,
      data: params.data,
      select: {
        id: true,
        revokedAt: true,
        token: true,
      },
    });
    return refreshToken;
  }
}
