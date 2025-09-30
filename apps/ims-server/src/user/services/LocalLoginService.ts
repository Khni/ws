import {
  IAuthTokensService,
  IUserService,
  LocalAuthService,
} from "@khaled/auth";
import { LocalLoginInput } from "@khaled/ims-shared";
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

  login = async (data: LocalLoginInput) => {
    const user = await this.localAuthService.verifyPassword({
      data: {
        password: data.password,
        identifier: data.identifier,
      },
    });
    const tokens = await this.authTokenService.generate(user.id);

    return { user, tokens };
  };
}
