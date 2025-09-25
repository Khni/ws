// container.ts
import {
  AuthTokensService,
  CreateOtpService,
  VerifyOtpService,
  Jwt,
  OtpSenderContext,
  BcryptHasher,
  OtpHandler,
  LocalAuthService,
  RefreshTokenService,
  AccessTokenService,
  RefreshTokenCookie,
} from "@khaled/auth";
import {
  createContainer,
  asClass,
  asValue,
  asFunction,
  InjectionMode,
} from "awilix";

import { RefreshTokenRepository } from "./user/repositories/RefreshTokenRepository.js";
import { UserRepository } from "./user/repositories/UserRepository.js";
import { OtpRepository } from "./user/repositories/OtpRepository.js";
import { config } from "./config/envSchema.js";
import { OtpMailSender } from "./core/otp/OtpMailSender.js";
import { OtpType } from "../generated/prisma/index.js";
import { Mailer } from "@khaled/mailer";
import { UserService } from "./user/services/UserService.js";
import { UserType } from "./user/types.js";
import { LocalLoginService } from "./user/services/LocalLoginService.js";

const container = createContainer({
  injectionMode: InjectionMode.CLASSIC,
});

container.register({
  // repositories
  refreshTokenRepository: asClass(RefreshTokenRepository).scoped(),
  userRepository: asClass(UserRepository).scoped(),
  otpRepository: asClass(OtpRepository).scoped(),

  //token
  tokenService: asClass(Jwt).singleton(),

  //hasher
  hasher: asClass(BcryptHasher).scoped(),

  //mailer
  mailer: asClass(Mailer).scoped(),
  refreshTokenCookie: asClass(RefreshTokenCookie).scoped(),
  //services
  userService: asClass(UserService).scoped(),
  localAuthService: asClass(LocalAuthService).scoped(),
  localLoginService: asClass(LocalLoginService).scoped(),
  // auth tokens
  refreshTokenService: asClass(RefreshTokenService).scoped(),
  accessTokenService: asClass(AccessTokenService).scoped(),
  authTokenService: asClass(AuthTokensService).scoped(),

  //otp
  createOtpService: asClass(CreateOtpService).scoped(),

  verifyOtpService: asClass(VerifyOtpService).scoped(),
  otpSenderContext: asClass(OtpSenderContext).scoped(),
  otpMailSender: asClass(OtpMailSender).scoped(),
  otpSenderStrategies: asFunction((otpMailSender) => [otpMailSender]).scoped(),

  otpForgetPasswordService: asFunction(
    (
      createOtpService,
      verifyOtpService,
      tokenService,
      localAuthService: LocalAuthService<UserType, UserService>
    ) =>
      new OtpHandler(
        createOtpService,
        verifyOtpService,
        tokenService,
        OtpType.FORGET_PASSWORD,
        localAuthService.resetPassword,
        "10m"
      )
  ).scoped(),

  // values
  isProduction: asValue(config.NODE_ENV === "production"),
  refreshTokenCookieOpts: asValue({
    cookieName: "refreshToken",
    path: "/",
    httpOnly: true,
    secure: config.NODE_ENV === "production",
    sameSite: config.NODE_ENV === "production" ? "lax" : "strict",
    maxAge: 60 * 60 * 24 * 15, // 15 days
  }),
  jwtSecret: asValue(config.JWT_SECRET),
  otpExpiresIn: asValue(60 * 10), //10 minutes
  otpTokenExpiresIn: asValue("10m"),
  otpConfig: asValue({
    min: 201101,
    max: 909989,
  }),
  mailerConfig: asValue({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: config.MAIL_USER,
      pass: config.MAIL_PASS,
    },
    templateDir: "templates",
  }),
  expiresAt: asFunction(() => {
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 15);
    return expiresAt;
  }).scoped(),

  // services
  // authTokenService: asFunction(
  //   ({
  //     refreshTokenRepository,
  //     userRepository,
  //     expiresAt,
  //     config,
  //   }): AuthTokensService =>
  //     createAuthTokenService(
  //       refreshTokenRepository,
  //       userRepository,
  //       expiresAt,
  //       config.JWT_SECRET,
  //       `${config.ACCSESS_TOKEN_EXPIRES_IN_MINUTES}m`
  //     )
  // ).scoped(),
});

export default container;
