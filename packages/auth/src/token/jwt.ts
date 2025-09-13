import jwt, { SignOptions, VerifyOptions, JwtPayload } from "jsonwebtoken";
import { IToken, SignTokenOptions } from "./IToken.js";
export type SafeSignOptions = Omit<SignOptions, "expiresIn"> & {
  expiresIn?: `${number}${"s" | "m" | "h" | "d"}`;
};
export class Jwt<T extends object = JwtPayload> implements IToken<T> {
  constructor(private JWT_SECRET: string) {}

  sign(payload: T, options: SignTokenOptions): string {
    if (options?.expiresIn && typeof options.expiresIn === "number") {
      throw new Error(
        `expiresIn should be a string like '10m' or '1h'. Passing a number means seconds, which may not be what you intended.`
      );
    }

    return jwt.sign(payload, this.JWT_SECRET, options);
  }
  verify(token: string, options?: VerifyOptions): T {
    return jwt.verify(token, this.JWT_SECRET, options) as T;
  }
}
