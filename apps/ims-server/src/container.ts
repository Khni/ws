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
  CryptoTokenGenerator,
} from "@khaled/auth";
import {
  createContainer,
  asClass,
  asValue,
  asFunction,
  InjectionMode,
  AwilixContainer,
  Resolver,
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
import { LocalRegistrationService } from "./user/services/LocalRegistrationService.js";

const appDeps = {
  // repositories
  refreshTokenRepository: asClass(RefreshTokenRepository).scoped(),
  userRepository: asClass(UserRepository).scoped(),
  otpRepository: asClass(OtpRepository).scoped(),

  //token
  tokenService: asClass(Jwt).singleton(),

  //hasher
  hasher: asClass(BcryptHasher).scoped(),

  //crypto
  crypto: asClass(CryptoTokenGenerator).scoped(),
  //mailer
  mailer: asClass(Mailer).scoped(),
  refreshTokenCookie: asClass(RefreshTokenCookie).scoped(),
  //services
  userService: asClass(UserService).scoped(),
  localAuthService: asClass(LocalAuthService).scoped(),
  localLoginService: asClass(LocalLoginService).scoped(),
  localRegistrationService: asClass(LocalRegistrationService).scoped(),
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
  indetifierTypeToSenderTypeMapping: asValue({
    email: "email" as const,
    phone: "sms" as const,
  }),
  otpForgetPasswordService: asFunction(
    (
      createOtpService,
      verifyOtpService,
      tokenService,
      localAuthService: LocalAuthService<UserType, UserService>,
      indetifierTypeToSenderTypeMapping
    ) =>
      new OtpHandler(
        createOtpService,
        verifyOtpService,
        tokenService,
        OtpType.FORGET_PASSWORD,
        localAuthService.resetPassword,
        "10m",
        indetifierTypeToSenderTypeMapping
      )
  ).scoped(),

  otpRegistrationService: asFunction(
    (
      createOtpService,
      verifyOtpService,
      tokenService,
      localRegistrationService: LocalRegistrationService,
      indetifierTypeToSenderTypeMapping
    ) =>
      new OtpHandler(
        createOtpService,
        verifyOtpService,
        tokenService,
        OtpType.VERIFY_IDENTIFIER,
        localRegistrationService.register,
        "10m",
        indetifierTypeToSenderTypeMapping
      )
  ).scoped(),

  // values
  isProduction: asValue(config.NODE_ENV === "production"),

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
};
type AppDeps = {
  [K in keyof typeof appDeps]: (typeof appDeps)[K] extends Resolver<infer T>
    ? T
    : never;
};

export type AppContainer = AwilixContainer<AppDeps>;

const container: AppContainer = createContainer({
  injectionMode: InjectionMode.CLASSIC,
});
container.register(appDeps);

export default container;
