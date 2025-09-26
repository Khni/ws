import {
  IAuthTokensService,
  IUserService,
  LocalAuthService,
} from "@khaled/auth";
import { RegisterBodySchemaType } from "@khaled/ims-shared";
import { UserType, UserCreateInput } from "../types.js";

export class LocalRegistrationService {
  constructor(
    private localAuthService: LocalAuthService<
      UserType,
      IUserService<UserType, UserCreateInput>
    >,
    private authTokenService: IAuthTokensService
  ) {}

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
}
