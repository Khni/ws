// -----------------------------
// Base Types
// -----------------------------

import { AuthDomainError } from "../errors/AuthDomainError.js";
import { AuthUnexpectedError } from "../errors/AuthUnexpectedError.js";
import { AuthUnexpectedErrorCodesType } from "../errors/errors.js";
import { BcryptHasher } from "../hasher/BcryptHasher.js";
import { IHasher } from "../hasher/IHasher.js";

// All user create-data types must at least have these fields
export type BaseCreateUserData = {
  password: string;
  identifier: string;
  identifierType: "email" | "phone" | "username";
};

// -----------------------------
// Interfaces
// -----------------------------

// Strategy contract (repository-like abstraction)
export interface ILocalUserStrategy<
  UserType,
  CreateDataType extends BaseCreateUserData = BaseCreateUserData,
> {
  // Find user by identifier (can be extended later)
  find(params: { identifier: string }): Promise<UserType | null>;

  // Create user with validated + hashed data
  create(params: CreateDataType): Promise<UserType>;
}

// Auth context contract (business logic layer)
export interface ILocalAuthContext<
  UserType,
  CreateDataType extends BaseCreateUserData = BaseCreateUserData,
> {
  createUser(params: { data: CreateDataType }): Promise<UserType>;
}

// -----------------------------
// LocalAuthContext Implementation
// -----------------------------

export class LocalAuthContext<
  S extends ILocalUserStrategy<any, any>, // Full strategy type
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
        throw new AuthDomainError("AUTH_USED_IDENTIFIER");
      }

      // hash password before creating
      const hashedPassword = await this.hasher.hash(data.password);

      user = await this.localAuthStrategy.create({
        ...data,
        password: hashedPassword, // overwrite plain password
      });

      return user;
    } catch (error) {
      this.handleAuthError(error, "AUTH_USER_CREATION_FAILED");
    }
  };
}

// -----------------------------
// Example Usage
// -----------------------------

// Your user model
type User = {
  id: string;
  email?: string;
  phone?: string;
  username?: string;
  firstName?: string;
  lastName?: string;
  password: string;
};

// Your create-data type extends the base
type CreateUserData = BaseCreateUserData & {
  firstName: string;
  lastName: string;
};

// Example implementation of strategy (e.g., Prisma, in-memory, etc.)
class PrismaLocalUserStrategy
  implements ILocalUserStrategy<User, CreateUserData>
{
  async find({ identifier }: { identifier: string }): Promise<User | null> {
    // find user in DB
    return null;
  }

  async create(params: CreateUserData): Promise<User> {
    // create user in DB
    return { id: "1", ...params };
  }
}

// -----------------------------
// Final: Generics inferred automatically 🎉
// -----------------------------

const strategy = new PrismaLocalUserStrategy();
const authContext = new LocalAuthContext(strategy);

const user = authContext.createUser({
  data: {
    identifier: "test@example.com",
    identifierType: "email",
    password: "123456",
    firstName: "Khaled",
    lastName: "Eleskandrany",
  },
});
