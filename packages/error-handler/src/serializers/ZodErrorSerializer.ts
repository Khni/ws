import { ZodError } from "zod";
import { InputValidationErrorType } from "../errors/types.js";
import { IZodErrorSerializer } from "./interfaces/IZodErrorSerializer.js";

export class ZodErrorSerializer implements IZodErrorSerializer {
  serializeError = (error: ZodError) => {
    return error.issues.map((issue) => ({
      path: issue.path.join("."),
      message: issue.message,
      code: issue.code,
    }));
  };

  serializeResponse = (zodError: ZodError) => {
    const errors = zodError.issues.reduce(
      (acc: Record<string, string[]>, error) => {
        const path = error.path.join(".");
        if (!acc[path]) {
          acc[path] = [];
        }
        acc[path].push(error.message);
        return acc;
      },
      {}
    );

    const formattedErrors: InputValidationErrorType = {
      name: "inputValidationError",
      errors: Object.entries(errors).map(([field, messages]) => ({
        field: field.replace("body.", ""),
        messages,
      })),
    };

    return formattedErrors;
  };
}
