import { IIdentifierUserRepository } from "../repositories/interfaces/IIdentifierUserRepository.js";
import { UserModel } from "../repositories/interfaces/IIdentifierUserRepository.js";
import {
  CreateUserStrategyParams,
  FindUserStrategyParams,
  ILocalUserStrategy,
  UpdateUserStrategyParams,
} from "./interfaces/ILocalUserStrategy.js";
type Subset<T> =
  | {
      [K in keyof T]: Pick<T, K>;
    }[keyof T]
  | T;

const kl: Subset<{ id: string; name: string }> = { id: "dd" } as const;

export class IdentifierUserTrategy<
  Model extends UserModel = UserModel,
  UserCreateInput extends Subset<Model> = Model,
> implements ILocalUserStrategy<Model>
{
  name = "identifier";
  constructor(
    private identifierRepository: IIdentifierUserRepository<
      Model,
      UserCreateInput
    >
  ) {}
  async find(params: FindUserStrategyParams): Promise<Model | null> {
    return await this.identifierRepository.findUnique(params);
  }
  async create(data: UserCreateInput): Promise<Model> {
    return await this.identifierRepository.create({ data });
  }
  async update(params: UpdateUserStrategyParams<Model>): Promise<Model> {
    return await this.identifierRepository.update({
      data: params.data,
      where: params.identifier,
    });
    throw new Error("Method not implemented.");
  }
}
