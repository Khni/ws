import { IHasher } from "../hasher/IHasher.js";
import {
  IOtpRepository,
  OtpModel,
} from "../repositories/interfaces/IOtpRepository.js";
import {
  CreateOtpData,
  ICreateOtpService,
  sendType,
} from "./interfaces/ICreateOtpService.js";
import { IOtpSenderStrategy } from "./interfaces/IOtpSenderStrategy.js";

export class CreateOtpService implements ICreateOtpService {
  constructor(
    private otpRepository: IOtpRepository<unknown>,
    private hasher: IHasher,
    private expiresIn: number, //in seconds
    private otpSenderStrategy: IOtpSenderStrategy
  ) {}
  execute<OtpType>({}: {
    sendType: sendType;
    data: CreateOtpData<OtpType>;
  }): Promise<OtpModel<OtpType>> {
    throw new Error("Method not implemented.");
  }
}
