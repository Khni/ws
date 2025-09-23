import { IAccessTokenService } from "../auth-tokens/interfaces/IAccessTokenService.js";
import { AuthDomainError } from "../errors/AuthDomainError.js";
import { ICreateOtpService } from "../otp/interfaces/ICreateOtpService.js";
import { IVerifyOtpService } from "../otp/interfaces/IVerifyOtpService.js";
import { IToken, ValidTimeString } from "../token/IToken.js";
import { LocalAuthContext } from "./LocalAuthContext.js";
import { AuthIdentifierType } from "./types/index.js";

export class ForgetPasswordWithOtp<OtpType> {
  constructor(
    private localAuth: LocalAuthContext,
    private createOtpService: ICreateOtpService<OtpType>,
    private verifyOtpService: IVerifyOtpService<OtpType>,
    private tokenService: IToken<{
      identifier: string;
      otpType: OtpType;
      verified: boolean;
    }>,
    private otpType: OtpType,
    private tokenExpiresIn: ValidTimeString = "10m"
  ) {}

  async requestOTP({
    data,
    authIdentifierType,
  }: {
    authIdentifierType: AuthIdentifierType;
    data: { identifier: string };
  }) {
    const user = await this.localAuth.findUser({ data, authIdentifierType });
    if (!user) {
      throw new AuthDomainError(
        "USER_IS_NOT_EXIST",
        `Unable to find ${authIdentifierType} with identifier "${data.identifier}" during forgot password request`
      );
    }
    const otp = await this.createOtpService.execute({
      data: {
        otpType: this.otpType,
        recipient: data.identifier,
      },
    });
    const token = this.tokenService.sign(
      {
        identifier: data.identifier,
        otpType: this.otpType,
        verified: false,
      },
      { expiresIn: this.tokenExpiresIn }
    );
    return token;
  }
  async verifyOTP({ otp, token }: { otp: string; token: string }) {
    const payload = this.tokenService.verify(token);
    if (!payload) {
      throw new Error();
    }
    const isVerified = await this.verifyOtpService.execute({
      otp: otp,
      type: this.otpType,
      identifier: payload?.identifier,
    });

    return this.tokenService.sign(
      {
        ...payload,
        verified: true,
      },
      { expiresIn: this.tokenExpiresIn }
    );
  }
}
