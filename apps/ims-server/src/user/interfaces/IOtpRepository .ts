import { IBaseRepository } from "@khaled/auth";
import { Prisma, Otp } from "../../../generated/prisma/index.js";

export interface IOtpRepository
  extends IBaseRepository<
    Otp,
    Prisma.OtpWhereUniqueInput,
    Prisma.OtpCreateInput
  > {}
