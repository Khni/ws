import { InputValidationErrorType } from "./types.js";

/**
 * A serializer function type that converts any raw error into InputValidationErrorType
 */
export type ErrorSerializer<T = unknown> = (
  error: T
) => InputValidationErrorType;

/**
 * A generic InputValidationError class that uses injected serializer
 */
export class InputValidationError<T = unknown> extends Error {
  public readonly name: string;
  public readonly errors: { field: string; messages: string[] }[];

  constructor(rawError: T, serializer: ErrorSerializer<T>) {
    const serialized = serializer(rawError);
    super(serialized.name);

    this.name = serialized.name;
    this.errors = serialized.errors;

    Object.setPrototypeOf(this, new.target.prototype);
  }

  toJSON(): InputValidationErrorType {
    return {
      name: this.name,
      errors: this.errors,
    };
  }
}
