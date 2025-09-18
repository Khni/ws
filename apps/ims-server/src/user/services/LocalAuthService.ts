import {
  AuthTokensService,
  createAuthTokenService,
  IUserService,
  LocalAuthService,
} from "@khaled/auth";
import { UserService } from "./LocalUserService.js";
import { UserCreateInput, UserType } from "../types.js";
import { RefreshTokenRepository } from "../repositories/RefreshTokenRepository.js";
import { UserRepository } from "../repositories/UserRepository.js";
import { authTokenService } from "./factory.js";

export class LocalAuth {
  authTokenService: AuthTokensService;
  constructor(
    private localAuthService: LocalAuthService<
      IUserService<UserType, UserCreateInput>
    > = new LocalAuthService(new UserService())
  ) {
    this.authTokenService = authTokenService();
  }

  register = async (data: UserCreateInput) => {
    const { password, ...user } = await this.localAuthService.createUser({
      data,
    });
    const tokens = await this.authTokenService.generate(user.id);

    return { user, tokens };
  };
}
