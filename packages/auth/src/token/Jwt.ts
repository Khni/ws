import jwt, { SignOptions, VerifyOptions } from "jsonwebtoken";

const { TokenExpiredError } = jwt; //to fix 'jsonwebtoken' does not provide an export named 'TokenExpiredError'
import { IToken, SignTokenOptions } from "./IToken.js";
import { AuthDomainError } from "../errors/AuthDomainError.js";
export type SafeSignOptions = Omit<SignOptions, "expiresIn"> & {
  expiresIn?: `${number}${"s" | "m" | "h" | "d"}`;
};
export class Jwt<T extends object> implements IToken<T> {
  constructor(private jwtSecret: string) {}

  sign(payload: T, options: SignTokenOptions): string {
    if (options?.expiresIn && typeof options.expiresIn === "number") {
      throw new Error(
        `expiresIn should be a string like '10m' or '1h'. Passing a number means seconds, which may not be what you intended.`
      );
    }

    // If expiresIn is provided, remove existing exp and iat to avoid conflicts
    let cleanPayload = { ...payload };
    if (options?.expiresIn) {
      const { exp, iat, ...rest } = cleanPayload as any;
      cleanPayload = rest as T;
    }

    return jwt.sign(cleanPayload, this.jwtSecret, options);
  }
  verify(token: string, options?: VerifyOptions): T {
    try {
      return jwt.verify(token, this.jwtSecret, options) as T;
    } catch (error) {
      //expired token is an expected error but other errors like if secret is wrong ..etc
      //should be unexpected errors

      if (error instanceof TokenExpiredError) {
        throw new AuthDomainError("TOKEN_EXPIRED");
      }
      throw error;
    }
  }
}
