import { AuthTokensService } from "../auth-tokens/AuthTokensService.js";
import { CreateUserStrategyParams } from "./interfaces/ILocalUserStrategy.js";
import { LocalAuthContext } from "./LocalAuthContext.js";
import { AuthIdentifierType } from "./types/index.js";

export class LocalAuthWithTokens {
  constructor(
    private localAuth: LocalAuthContext,
    private authTokensService: AuthTokensService
  ) {}

  async register({
    data,
    authIdentifierType,
  }: {
    authIdentifierType: AuthIdentifierType;
    data: CreateUserStrategyParams;
  }) {
    const { password, ...user } = await this.localAuth.createUser({
      data,
      authIdentifierType,
    });

    const tokens = await this.authTokensService.generate(user.id);
    return {
      user,
      tokens,
    };
  }

  async login({
    data,
    authIdentifierType,
  }: {
    authIdentifierType: AuthIdentifierType;
    data: { password: string; identifier: string };
  }) {
    const { password, ...user } = await this.localAuth.verifyPassword({
      data,
      authIdentifierType,
    });
    const tokens = await this.authTokensService.generate(user.id);
    return {
      user,
      tokens,
    };
  }

  async changePassword({
    data,
    authIdentifierType,
  }: {
    authIdentifierType: AuthIdentifierType;
    data: { identifier: string; password: string; newPassword: string };
  }) {
    const { password, ...user } = await this.localAuth.verifyPassword({
      data,
      authIdentifierType,
    });
    await this.localAuth.resetPassword({
      data,
      authIdentifierType,
    });
    const tokens = await this.authTokensService.generate(user.id);
    return {
      user,
      tokens,
    };
  }
}
