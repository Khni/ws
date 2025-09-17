import { Prisma, PrismaClient } from "../../../generated/prisma/index.js";
import { DefaultArgs } from "../../../generated/prisma/runtime/library.js";

export type PrismaTransactionManager = Omit<
  PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>,
  "$connect" | "$disconnect" | "$on" | "$transaction" | "$use" | "$extends"
>;
