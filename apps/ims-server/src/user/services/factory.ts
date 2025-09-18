import { AuthTokensService, createAuthTokenService } from "@khaled/auth";
import { RefreshTokenRepository } from "../repositories/RefreshTokenRepository.js";
import { UserRepository } from "../repositories/UserRepository.js";
import { config } from "../../config/envSchema.js";

export const authTokenService = (): AuthTokensService => {
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 15);
  return createAuthTokenService(
    new RefreshTokenRepository(),
    new UserRepository(),
    expiresAt,
    config.JWT_SECRET,
    `${config.ACCSESS_TOKEN_EXPIRES_IN_MINUTES}m`
  );
};
