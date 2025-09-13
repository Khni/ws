import { IToken, ValidTimeString } from "../token/IToken.js";

export class AccessTokenService {
  constructor(
    private tokenService: IToken<{ userId: string }>,
    private tokenExpiresIn: ValidTimeString = "10m"
  ) {}

  generate = (userId: string) => {
    return this.tokenService.sign(
      { userId },
      { expiresIn: this.tokenExpiresIn }
    );
  };

  verify = (token: string) => {
    return this.tokenService.verify(token);
  };
}
