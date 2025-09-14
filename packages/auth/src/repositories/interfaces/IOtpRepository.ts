import { IBaseRepository } from "./IBaseRepository.js";

export type OtpModel<OtpType> = {
  id: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  expiresAt: Date;
  type: OtpType;
  hashedOtp: string;
};

export type OtpCreateInput<OtpType> = Pick<
  OtpModel<OtpType>,
  "userId" | "type" | "expiresAt" | "hashedOtp"
>;

export type OtpUpdateInput<OtpType> = Partial<OtpModel<OtpType>>;

export type OtpWhereUniqueInput = { id: string };
export interface IOtpRepository<OtpType>
  extends IBaseRepository<
    OtpModel<OtpType>,
    OtpWhereUniqueInput,
    OtpCreateInput<OtpType>
  > {}
