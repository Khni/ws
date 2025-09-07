import { ZodError } from "zod";
import { InputValidationError } from "../../errors/types.js";

export interface IZodErrorSerializer {
  serializeError: (error: ZodError) => {
    path: string;
    message: string;
    code:
      | "invalid_type"
      | "invalid_literal"
      | "unrecognized_keys"
      | "invalid_union"
      | "invalid_union_discriminator"
      | "invalid_enum_value"
      | "invalid_arguments"
      | "invalid_return_type"
      | "invalid_date"
      | "invalid_string"
      | "too_small"
      | "too_big"
      | "invalid_intersection_types"
      | "not_multiple_of"
      | "not_finite"
      | "custom";
  }[];

  serializeResponse: (zodError: ZodError) => InputValidationError;
}
