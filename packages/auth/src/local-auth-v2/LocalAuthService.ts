import { AuthDomainError } from "../errors/AuthDomainError.js";
import { AuthUnexpectedError } from "../errors/AuthUnexpectedError.js";
import { AuthUnexpectedErrorCodesType } from "../errors/errors.js";
import { BcryptHasher } from "../hasher/BcryptHasher.js";
import { IHasher } from "../hasher/IHasher.js";
import { ILocalAuthService } from "./interfaces/ILocalAuthService.js";
import { IUserService } from "./interfaces/IUserRepository.js";
import { BaseCreateUserData, UserIdentifierType } from "./types.js";

export class LocalAuthService<
  UserType,
  S extends IUserService<any, BaseCreateUserData>,
> implements
    ILocalAuthService<
      UserType, // infer UserType from strategy
      Parameters<S["create"]>[0] // infer CreateDataType from strategy
    >
{
  constructor(
    private localAuthStrategy: S,
    private hasher: IHasher = new BcryptHasher()
  ) {}

  private handleAuthError(
    error: unknown,
    code: AuthUnexpectedErrorCodesType,
    msg?: string,
    meta?: {}
  ): never {
    if (error instanceof AuthDomainError) throw error;
    throw new AuthUnexpectedError(code, error, msg, meta);
  }

  // Business logic for creating a user
  createUser = async ({
    data,
  }: {
    data: Parameters<S["create"]>[0]; // inferred from strategy
  }): Promise<Awaited<ReturnType<S["create"]>>> => {
    try {
      // check if identifier already used
      let user = await this.localAuthStrategy.findByIdentifier({
        identifier: data.identifier,
      });

      if (user) {
        throw new AuthDomainError("AUTH_USED_IDENTIFIER", `${data.identifier}`);
      }

      // hash password before creating
      const hashedPassword = await this.hasher.hash(data.password);

      user = await this.localAuthStrategy.create({
        ...data,
        password: hashedPassword,
      });

      return user;
    } catch (error) {
      this.handleAuthError(error, "AUTH_USER_CREATION_FAILED");
    }
  };

  verifyPassword = async ({
    data,
  }: {
    data: {
      password: string;
      identifier: string;
    };
  }): Promise<UserType> => {
    try {
      let user = await this.localAuthStrategy.findByIdentifier({
        identifier: data.identifier,
      });
      if (!user) {
        throw new AuthDomainError(
          "INCORRECT_CREDENTIALS",
          `identifier is not exist`
        );
      }

      if (!user.password) {
        throw new AuthDomainError(
          "USER_NOT_LOCAL",
          `identifier  is not local registered`
        );
      }

      const isValidPassword = await this.hasher.compare(
        data.password,
        user?.password
      );
      if (!isValidPassword) {
        throw new AuthDomainError(
          "INCORRECT_CREDENTIALS",
          `password for identifier ${data.identifier} is not Match`
        );
      }

      return user;
    } catch (error) {
      this.handleAuthError(error, "LOGIN_FAILED");
    }
  };

  async resetPassword({
    data,
  }: {
    data: {
      newPassword: string;
      identifier: string;
    };
  }): Promise<Awaited<ReturnType<S["update"]>>> {
    try {
      const hashedPassword = await this.hasher.hash(data.newPassword);
      const user = await this.localAuthStrategy.update({
        data: {
          password: hashedPassword,
        },
        identifier: data.identifier,
      });
      return user;
    } catch (error) {
      this.handleAuthError(error, "PASSWORD_RESET_FAILED");
    }
  }

  findUserByIdentifier = async (
    identifier: string
  ): Promise<Awaited<ReturnType<S["findByIdentifier"]>>> => {
    try {
      let user = await this.localAuthStrategy.findByIdentifier({
        identifier,
      });

      return user;
    } catch (error) {
      this.handleAuthError(error, "FINDING_USER_FAILED", "", {
        identifier,
      });
    }
  };
}
