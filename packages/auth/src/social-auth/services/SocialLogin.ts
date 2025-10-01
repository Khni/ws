import { AuthTokensService } from "../../auth-tokens/AuthTokensService.js";
import {
  Provider,
  SocialUserResult,
} from "../interfaces/ISocialAuthProvider.js";
import { SocialAuthContext } from "./SocialAuthContext.js";

export class SocialAuthLogin<User extends { id: string }> {
  constructor(
    private socialAuthContext: SocialAuthContext,
    private tokenService: AuthTokensService,
    private handleSocialUser: (
      user: SocialUserResult,
      provider: Provider
    ) => Promise<User>
  ) {}

  async execute(code: string, provider: Provider) {
    const { user } = await this.socialAuthContext.authenticate(code, provider);
    let _user = await this.handleSocialUser(user, provider);
    const { accessToken, refreshToken } = await this.tokenService.generate(
      _user.id
    );

    return {
      accessToken,
      refreshToken,
      user,
    };
  }
}
