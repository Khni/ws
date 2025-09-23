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
import {
  LoginBodySchemaType,
  registerBodySchema,
  RegisterBodySchemaType,
} from "@khaled/ims-shared";

export class LocalAuth {
  authTokenService: AuthTokensService;
  constructor(
    private localAuthService: LocalAuthService<
      UserType,
      IUserService<UserType, UserCreateInput>
    > = new LocalAuthService(new UserService())
  ) {
    this.authTokenService = authTokenService();
  }

  register = async (data: RegisterBodySchemaType) => {
    const { identifier, ...restData } = data;
    const { password, ...user } = await this.localAuthService.createUser({
      data: {
        ...restData,
        identifier: identifier.value,
        identifierType: identifier.type,
      },
    });
    const tokens = await this.authTokenService.generate(user.id);

    return { user, tokens };
  };

  login = async (data: LoginBodySchemaType) => {
    const { identifier, ...restData } = data;
    const user = await this.localAuthService.verifyPassword({
      data: {
        password: restData.password,
        identifier: identifier.value,
      },
    });
    const tokens = await this.authTokenService.generate(user.id);

    return { user, tokens };
  };

  resetPassword = async ({
    identifier,
    newPassword,
  }: {
    identifier: string;
    newPassword: string;
  }) => {
    return await this.localAuthService.resetPassword({
      data: { identifier, newPassword },
    });
  };
}
