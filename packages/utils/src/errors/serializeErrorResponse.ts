import { InputValidationErrorType } from "@khaled/error-handler";

export type ServerError<ErrorCode> = { code: ErrorCode };

export const parseServerError = <ErrorCode>(
  error: ServerError<ErrorCode> | InputValidationErrorType
) => {
  // Case 1: Server error
  if ("code" in error) {
    return error.code;
  }

  // Case 2: Input Validation errors
  if ("name" in error && "errors" in error && Array(error.errors)) {
    return error;
  }

  return "UNKNOWN_ERROR";
};
