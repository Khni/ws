import z from "zod";
import { ValidateIdentifier } from "./validateIdentifier.js";
const validateIdentifier = new ValidateIdentifier();
export const RegisterBodyschema = z
  .object({
    password: z.string().min(8, "Password must be at least 5 characters long"),
    identifier: z
      .string()
      .min(5, "Identifier must be at least 5 characters long"),
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
  })
  .superRefine(validateIdentifier.superRefine)
  .transform(validateIdentifier.transform);
