import { AccessTokenService } from "./auth-tokens/AccessTokenService.js";
import { AuthTokensService } from "./auth-tokens/AuthTokensService.js";
import {
  FindUniqueUserById,
  RefreshTokenService,
} from "./auth-tokens/RefreshTokenService.js";
import { CryptoTokenGenerator } from "./crypto/Crypto.js";
import { IRefreshTokenRepository } from "./repositories/interfaces/IRefreshTokenRepository.js";
import { Jwt } from "./token/jwt.js";
export const createAuthTokenService = (
  refreshTokenRepository: IRefreshTokenRepository,
  findUniqueUserById: FindUniqueUserById,
  expiresAt: Date,
  jwtSecret: string
) =>
  new AuthTokensService(
    new RefreshTokenService(
      refreshTokenRepository,
      new CryptoTokenGenerator(),
      expiresAt,
      findUniqueUserById
    ),
    new AccessTokenService(new Jwt<{ userId: string }>(jwtSecret), "10m")
  );
