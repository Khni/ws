import { AuthDomainError } from "../errors/AuthDomainError.js";
import { AuthUnexpectedError } from "../errors/AuthUnexpectedError.js";
import { AuthUnexpectedErrorCodesType } from "../errors/errors.js";
import { BcryptHasher } from "../hasher/BcryptHasher.js";
import { IHasher } from "../hasher/IHasher.js";
import { ILocalAuthContext } from "./interfaces/ILocalAuthContext.js";
import { ILocalUserStrategy } from "./interfaces/IUserServiceStrategy.js";
import { BaseCreateUserData, UserIdentifierType } from "./types.js";

export class LocalAuthContext<
  S extends ILocalUserStrategy<any, BaseCreateUserData>, // Full strategy type
> implements
    ILocalAuthContext<
      Awaited<ReturnType<S["create"]>>, // infer UserType from strategy
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
      let user = await this.localAuthStrategy.find({
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
  }): Promise<Awaited<ReturnType<S["find"]>>> => {
    try {
      let user = await this.localAuthStrategy.find({
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
  ): Promise<Awaited<ReturnType<S["find"]>>> => {
    try {
      let user = await this.localAuthStrategy.find({
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

/**
 * #############################################################
 * Exampe Usage
 */

type User = {
  id: string;
  identifierType: UserIdentifierType;
  identifier: string;
  firstName?: string;
  lastName?: string;
  password: string;
};

type CreateUserData = BaseCreateUserData & {
  firstName: string;
  lastName: string;
};

class PrismaLocalUserStrategy
  implements ILocalUserStrategy<User, CreateUserData>
{
  update(params: { data: Partial<User>; identifier: string }): Promise<User> {
    throw new Error("Method not implemented.");
  }
  async find({ identifier }: { identifier: string }): Promise<User | null> {
    // find user in DB
    return null;
  }

  async create(params: CreateUserData): Promise<User> {
    // create user in DB
    return { id: "1", ...params };
  }
}

const auth = new LocalAuthContext(new PrismaLocalUserStrategy());
const user = await auth.createUser({
  data: {
    identifier: "test@example.com",
    identifierType: "email",
    password: "123456",
    firstName: "Khaled",
    lastName: "Eleskandrany",
  },
});

const _user = await auth.resetPassword({
  data: {
    identifier: "test@example.com",

    newPassword: "123456",
  },
});

const __user = await auth.findUserByIdentifier("");
