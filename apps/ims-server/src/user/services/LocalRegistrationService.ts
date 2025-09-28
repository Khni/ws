import {
  IAuthTokensService,
  IUserService,
  LocalAuthService,
} from "@khaled/auth";

import { UserType, UserCreateInput } from "../types.js";

export class LocalRegistrationService {
  constructor(
    private localAuthService: LocalAuthService<
      UserType,
      IUserService<UserType, Omit<UserCreateInput, "identifierType">> // the identifier type will be passed by localAuthService
    >,
    private authTokenService: IAuthTokensService
  ) {}

  register = async ({
    data,
  }: {
    data: {
      identifier: string;
      firstName: string;
      lastName: string;
      password: string;
    };
  }) => {
    const { password, ...user } = await this.localAuthService.createUser({
      data,
    });
    const tokens = await this.authTokenService.generate(user.id);

    return { user, tokens };
  };
}
