import { HttpError } from "../errors/HttpError.js";

// Concrete implementation of HttpError for mapping
export class MappedHttpError extends HttpError {
  public statusCode: number;

  constructor(params: HttpError) {
    super(params);
    this.statusCode = params.statusCode;
  }
}
