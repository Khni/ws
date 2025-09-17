// user repository interface

import { AccessTokenService } from "./auth-tokens/AccessTokenService.js";
import { AuthTokensService } from "./auth-tokens/AuthTokensService.js";
import {
  FindUniqueUserById,
  RefreshTokenService,
} from "./auth-tokens/RefreshTokenService.js";
import { CryptoTokenGenerator } from "./crypto/Crypto.js";
import { IRefreshTokenRepository } from "./repositories/interfaces/IRefreshTokenRepository.js";
import { Jwt } from "./token/jwt.js";
export * from "./auth-tokens/AuthTokensService.js";
export * from "./repositories/interfaces/IRefreshTokenRepository.js";

// local auth interfaces
export * from "./local-auth/interfaces/ILocalUserStrategy.js";
export * from "./local-auth/interfaces/IlocalAuthContext.js";

// local auth services
export * from "./local-auth/EmailUserStrategy.js";
export * from "./local-auth/LocalAuthContext.js";

// refreshtoken interface
export * from "./auth-tokens/interfaces/IRefreshTokenService.js";

// refreshtoken service
export * from "./auth-tokens/RefreshTokenService.js";

// errors
export * from "./errors/errors.js";

// types
export * from "./local-auth/types/index.js";

// local auth v2 services
export * from "./local-auth-v2/interfaces/IUserRepository.js";
export * from "./local-auth-v2/interfaces/ILocalAuthService.js";
export * from "./local-auth-v2/LocalAuthService.js";

export * from "./repositories/interfaces/IBaseRepository.js";
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
