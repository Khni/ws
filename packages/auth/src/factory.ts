import { AccessTokenService } from "./auth-tokens/AccessTokenService.js";
import { AuthTokensService } from "./auth-tokens/AuthTokensService.js";
import {
  FindUniqueUserById,
  RefreshTokenService,
} from "./auth-tokens/RefreshTokenService.js";
import { CryptoTokenGenerator } from "./crypto/Crypto.js";
import { CreateOtpService } from "./otp/CreateOtpService.js";
import { IOtpSenderContext } from "./otp/interfaces/IOtpSenderContext.js";
import { OtpHandler } from "./otp/OtpHandler.js";
import { VerifyOtpService } from "./otp/VerifyOtpService.js";
import { IOtpRepository } from "./repositories/interfaces/IOtpRepository.js";
import { IRefreshTokenRepository } from "./repositories/interfaces/IRefreshTokenRepository.js";
import { ValidTimeString } from "./token/IToken.js";
import { Jwt } from "./token/jwt.js";
export const createAuthTokenService = (
  refreshTokenRepository: IRefreshTokenRepository,
  findUniqueUserById: FindUniqueUserById,
  expiresAt: Date,
  jwtSecret: string,
  jwtExpiresIn: ValidTimeString
) =>
  new AuthTokensService(
    new RefreshTokenService(
      refreshTokenRepository,
      new CryptoTokenGenerator(),
      expiresAt,
      findUniqueUserById
    ),
    new AccessTokenService(new Jwt<{ userId: string }>(jwtSecret), jwtExpiresIn)
  );

export const otpHandler = <OtpType, ExecuteFnTData>({
  otpRepository,
  expiresIn,
  otpSenderContext,
  jwtSecret,
  otpType,
  executeFn,
}: {
  otpRepository: IOtpRepository<OtpType>;
  expiresIn: number;
  otpSenderContext: IOtpSenderContext;
  jwtSecret: string;
  otpType: OtpType;
  executeFn: (
    data: ExecuteFnTData & { identifier: string }
  ) => Promise<unknown>;
}) => {
  return new OtpHandler(
    new CreateOtpService(otpRepository, expiresIn, otpSenderContext),
    new VerifyOtpService(otpRepository),
    new Jwt(jwtSecret),
    otpType,
    executeFn
  );
};
