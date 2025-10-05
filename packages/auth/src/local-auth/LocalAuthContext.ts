import { BcryptHasher } from "../hasher/BcryptHasher.js";
import { IHasher } from "../hasher/IHasher.js";
import { AuthDomainError } from "@khaled/auth-errors";
import { AuthUnexpectedError } from "@khaled/auth-errors";
import { AuthUnexpectedErrorCodesType } from "@khaled/auth-errors";
import { ILocalAuthContext } from "./interfaces/IlocalAuthContext.js";
import {
  CreateUserStrategyParams,
  ILocalUserStrategy,
} from "./interfaces/ILocalUserStrategy.js";
import { AuthIdentifierType } from "./types/index.js";

export class LocalAuthContext implements ILocalAuthContext {
  constructor(
    private localAtuhStrategies: ILocalUserStrategy[],
    private hasher: IHasher = new BcryptHasher()
  ) {}

  getStrategy = (authIdentieferType: AuthIdentifierType) => {
    const strategy = this.localAtuhStrategies.find(
      (s) => s.name === authIdentieferType
    );

    if (!strategy) {
      throw new Error(
        `There is no UserStrategy matchs with: ${authIdentieferType}`
      );
    }

    return strategy;
  };

  private handleAuthError(
    error: unknown,
    code: AuthUnexpectedErrorCodesType,
    msg?: string,
    meta?: {}
  ): never {
    if (error instanceof AuthDomainError) {
      throw error;
    }

    throw new AuthUnexpectedError(code, error, msg, meta);
  }

  createUser = async ({
    data,
    authIdentifierType,
  }: {
    authIdentifierType: AuthIdentifierType;
    data: CreateUserStrategyParams;
  }) => {
    try {
      const userStrategy = this.getStrategy(authIdentifierType);
      let user = await userStrategy.find({
        identifier: data.identifier,
      });
      if (user) {
        throw new AuthDomainError("AUTH_USED_EMAIL");
      }
      const hashedPassword = await this.hasher.hash(data.password);

      user = await userStrategy.create({
        ...data,
        password: hashedPassword,
      });

      return user;
    } catch (error) {
      this.handleAuthError(error, "AUTH_USER_CREATION_FAILED");
    }
  };

  findUser = async ({
    data,
    authIdentifierType,
  }: {
    authIdentifierType: AuthIdentifierType;
    data: { identifier: string };
  }) => {
    try {
      const userStrategy = this.getStrategy(authIdentifierType);
      let user = await userStrategy.find({
        identifier: data.identifier,
      });

      return user;
    } catch (error) {
      this.handleAuthError(error, "FINDING_USER_FAILED", "", {
        identifer: data.identifier,
      });
    }
  };

  verifyPassword = async ({
    data,
    authIdentifierType,
  }: {
    authIdentifierType: AuthIdentifierType;
    data: {
      password: string;
      identifier: string;
    };
  }) => {
    try {
      const userStrategy = this.getStrategy(authIdentifierType);
      let user = await userStrategy.find({
        identifier: data.identifier,
      });
      if (!user) {
        throw new AuthDomainError(
          "INCORRECT_CREDENTIALS",
          `${userStrategy.name} is not exist`
        );
      }

      if (!user.password) {
        throw new AuthDomainError(
          "USER_NOT_LOCAL",
          `${userStrategy.name}  is not local registered`
        );
      }

      const isValidPassword = await this.hasher.compare(
        data.password,
        user?.password
      );
      if (!isValidPassword) {
        throw new AuthDomainError(
          "INCORRECT_CREDENTIALS",
          `password for ${userStrategy.name} ${data.identifier} is not Match`
        );
      }

      return user;
    } catch (error) {
      this.handleAuthError(error, "LOGIN_FAILED");
    }
  };

  async resetPassword({
    data,
    authIdentifierType,
  }: {
    authIdentifierType: AuthIdentifierType;
    data: {
      newPassword: string;
      identifier: string;
    };
  }) {
    try {
      const userStrategy = this.getStrategy(authIdentifierType);
      const hashedPassword = await this.hasher.hash(data.newPassword);
      const user = await userStrategy.update({
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
}
