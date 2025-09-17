import { AuthTokensService, createAuthTokenService } from "@khaled/auth";
import { RefreshTokenRepository } from "../repositories/RefreshTokenRepository.js";
import { UserRepository } from "../repositories/UserRepository.js";

export const authTokenService = (): AuthTokensService => {
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 15);
  return createAuthTokenService(
    new RefreshTokenRepository(),
    new UserRepository(),
    expiresAt,
    "jwt_secret"
  );
};
