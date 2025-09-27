import {
  IAuthTokensService,
  IUserService,
  LocalAuthService,
} from "@khaled/auth";
import { RegisterBodySchemaType } from "@khaled/ims-shared";
import { UserType, UserCreateInput } from "../types.js";
import z from "zod";
import { IdentifierTypeSchema } from "../../../prisma/generated/zod/index.js";

export class LocalRegistrationService {
  constructor(
    private localAuthService: LocalAuthService<
      UserType,
      IUserService<UserType, UserCreateInput>
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
    const identifierSchema = z.union([
      z.e164().transform((val) => ({ type: "phone" as const, value: val })),
      z.email().transform((val) => ({ type: "email" as const, value: val })),
    ]);
    const { value: identifier, type: identifierType } = identifierSchema.parse(
      data.identifier
    );
    const { password, ...user } = await this.localAuthService.createUser({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        password: data.password,
        identifier,
        identifierType,
      },
    });
    const tokens = await this.authTokenService.generate(user.id);

    return { user, tokens };
  };
}
