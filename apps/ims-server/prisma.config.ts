// this is nessary for prisma to locate the schema file correctly when using multi file structure
import path from "node:path";
import type { PrismaConfig } from "prisma";

export default {
  schema: path.join("prisma"),
} satisfies PrismaConfig;
