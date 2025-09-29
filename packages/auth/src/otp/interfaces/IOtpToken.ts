import { IToken } from "../../token/IToken.js";

export interface IOtpToken<OtpType>
  extends IToken<{
    identifier: string;
    otpType: OtpType;
    verified: boolean;
  }> {}
