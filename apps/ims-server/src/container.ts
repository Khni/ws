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
  OtpGuardedExecutor,
  SocialAuthContext,
  FacebookSocialAuthStrategy,
  GoogleSocialAuthStrategy,
  SocialAuthLogin,
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
import { generateExpiredDate, parseTimeString } from "@khaled/utils";
import { handleSocialUser } from "./user/services/handleSocialUser.js";

export const appDeps = {
  // repositories
  refreshTokenRepository: asClass(RefreshTokenRepository).scoped(),
  userRepository: asClass(UserRepository).scoped(),
  otpRepository: asClass(OtpRepository).scoped(),
  refreshTokenExpiresIn: asValue("15d"),
  accessTokenExpiresIn: asValue("10m"),
  //values
  otpTypeToOtpTokenExpiresInMapping: asValue({
    [OtpType.SIGN_UP]: "10m",
    [OtpType.FORGET_PASSWORD]: "10m",
  }),
  otpTypeToOtpExpiresInMapping: asValue({
    [OtpType.SIGN_UP]: "1d",
    [OtpType.FORGET_PASSWORD]: "10m",
  }),

  otpSignUpService: asFunction(
    (tokenService, localRegistrationService: LocalRegistrationService) =>
      new OtpGuardedExecutor(
        OtpType.SIGN_UP,
        tokenService,
        localRegistrationService.register
      )
  ).scoped(),
  otpForgetPasswordService: asFunction(
    (tokenService, localAuthService: LocalAuthService<UserType, UserService>) =>
      new OtpGuardedExecutor(
        OtpType.FORGET_PASSWORD,
        tokenService,
        localAuthService.resetPassword
      )
  ).scoped(),

  parseTimeString: asValue(parseTimeString),

  generateExpiredDate: asValue(generateExpiredDate),
  // utils

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

  //social login
  googleAuthConfig: asValue({
    clientId: config.GOOGLE_CLIENT_ID,
    clientSecret: config.GOOGLE_SECRET,
    redirectUri: config.GOOGLE_SECRET,
  }),
  facebookAuthConfig: asValue({
    appId: config.FACEBOOK_APP_ID,
    appSecret: config.FACEBOOK_SECRET,
    redirectUri: config.FACEBOOK_REDIRECT_URI,
  }),
  socialAuthContext: asClass(SocialAuthContext).scoped(),
  handleSocialUser: asValue(handleSocialUser),
  facebookSocialAuthStrategy: asClass(FacebookSocialAuthStrategy),
  googleSocialAuthStrategy: asClass(GoogleSocialAuthStrategy),
  socialAuthProviders: asFunction(
    (facebookSocialAuthStrategy, googleSocialAuthStrategy) => [
      facebookSocialAuthStrategy,
      googleSocialAuthStrategy,
    ]
  ).scoped(),
  socialAuthLogin: asClass(
    SocialAuthLogin<Awaited<ReturnType<typeof handleSocialUser>>>
  ),

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
  otpHandler: asClass(OtpHandler<OtpType>).scoped(),

  // config
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
