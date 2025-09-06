import { HttpErrorConstructor } from "../../errors/types.js";

export const httpErrorConstructor: HttpErrorConstructor = {
  message: "Failed to fetch resource from API.",
  meta: {
    endpoint: "/api/products",
    retryCount: 2,
  },
  code: "FETCH_ERROR_001", // Can be anything since CodeType is unknown
  logLevel: "warn",
  cause: { timeout: true },
  responseMessage: "The server did not respond within the timeout limit.",
  name: "HttpTimeoutError",
};
