import {
  IAuthTokensService,
  IUserService,
  LocalAuthService,
} from "@khaled/auth";
import { LoginBodySchemaType } from "@khaled/ims-shared";
import { UserType, UserCreateInput } from "../types.js";
import { ILocalLoginService } from "../interfaces/IlocalLoginService.js";

export class LocalLoginService implements ILocalLoginService {
  constructor(
    private localAuthService: LocalAuthService<
      UserType,
      IUserService<UserType, UserCreateInput>
    >,
    private authTokenService: IAuthTokensService
  ) {}

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
}
