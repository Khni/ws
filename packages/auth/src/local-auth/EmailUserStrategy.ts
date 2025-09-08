import { IUserRepository } from "../repositories/interfaces/IUserRepository.js";
import {
  CreateUserStrategyParams,
  FindUserStrategyParams,
  ILocalUserStrategy,
  UpdateUserStrategyParams,
} from "./interfaces/ILocalUserStrategy.js";

export class EmailUserStrategy implements ILocalUserStrategy {
  constructor(private userRepository: IUserRepository) {}
  name = "email";

  async find({ identifier }: FindUserStrategyParams) {
    return await this.userRepository.findUnique({
      where: { email: identifier },
    });
  }
  async create({
    firstName,
    lastName,
    password: hashedPassword,
    identifier,
    verified,
  }: CreateUserStrategyParams) {
    return await this.userRepository.create({
      data: {
        firstName,
        lastName,
        password: hashedPassword,
        email: identifier,
        verified,
      },
    });
  }

  async update(params: UpdateUserStrategyParams) {
    return await this.userRepository.update({
      where: { email: params.identifier },
      data: params.data,
    });
  }
}
