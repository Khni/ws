import { z } from "zod";
export const identifierSchema = z.union([
  z.e164().transform((val) => ({ type: "phone" as const, value: val })),
  z.email().transform((val) => ({ type: "email" as const, value: val })),
]);
