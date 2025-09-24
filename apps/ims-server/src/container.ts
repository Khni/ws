// container.ts
import {
  AuthTokensService,
  createAuthTokenService,
  CreateOtpService,
  VerifyOtpService,
  Jwt,
  OtpSenderContext,
  BcryptHasher,
  otpHandler,
  OtpHandler,
} from "@khaled/auth";
import { createContainer, asClass, asValue, asFunction } from "awilix";

import { RefreshTokenRepository } from "./user/repositories/RefreshTokenRepository.js";
import { UserRepository } from "./user/repositories/UserRepository.js";
import { OtpRepository } from "./user/repositories/OtpRepository.js";
import { config } from "./config/envSchema.js";
import { OtpMailSender } from "./core/otp/OtpMailSender.js";

const container = createContainer();

container.register({
  // repositories
  refreshTokenRepository: asClass(RefreshTokenRepository).scoped(),
  userRepository: asClass(UserRepository).scoped(),
  otpRepository: asClass(OtpRepository).scoped(),

  //token
  tokenService: asClass(Jwt).singleton(),

  //hasher
  hasher: asClass(BcryptHasher),

  //otp
  createOtpService: asClass(CreateOtpService).scoped(),
  verifyOtpService: asClass(VerifyOtpService).scoped(),
  otpSenderContext: asClass(OtpSenderContext).scoped(),
  otpMailSender: asClass(OtpMailSender).scoped(),
  otpSenderStrategies: asFunction(({ otpMailSender }) => [
    otpMailSender,
  ]).scoped(),
  otpHandler: asClass(OtpHandler),

  // values
  jwtSecret: asValue(config.JWT_SECRET),
  otpExpiresIn: asValue(60 * 10), //10 minutes
  otpTokenExpiresIn: asValue("10m"),
  otpConfig: asValue({
    min: 201101,
    max: 909989,
  }),
  expiresAt: asFunction(() => {
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 15);
    return expiresAt;
  }).scoped(),

  // services
  authTokenService: asFunction(
    ({
      refreshTokenRepository,
      userRepository,
      expiresAt,
      config,
    }): AuthTokensService =>
      createAuthTokenService(
        refreshTokenRepository,
        userRepository,
        expiresAt,
        config.JWT_SECRET,
        `${config.ACCSESS_TOKEN_EXPIRES_IN_MINUTES}m`
      )
  ).scoped(),
});

export default container;
