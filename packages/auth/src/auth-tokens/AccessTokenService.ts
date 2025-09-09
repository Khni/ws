import { IToken } from "../token/IToken.js";

export class AccessTokenService {
  constructor(private tokenService: IToken<{ userId: string }>) {}

  generate = (userId: string) => {
    return this.tokenService.sign({ userId });
  };

  verify = (token: string) => {
    return this.tokenService.verify(token);
  };
}
