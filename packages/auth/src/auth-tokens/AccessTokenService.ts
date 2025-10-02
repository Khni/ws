import { th } from "zod/v4/locales";
import { IToken, ValidTimeString } from "../token/IToken.js";
import { AuthDomainError } from "../errors/AuthDomainError.js";

export class AccessTokenService {
  constructor(
    private tokenService: IToken<{ userId: string }>,
    private accessTokenExpiresIn: ValidTimeString = "10m"
  ) {}

  generate = (userId: string) => {
    return this.tokenService.sign(
      { userId },
      { expiresIn: this.accessTokenExpiresIn }
    );
  };

  verify = (token?: string | null) => {
    if (!token) {
      throw new AuthDomainError("MISSING_ACCESS_TOKEN");
    }
    return this.tokenService.verify(token);
  };
}
