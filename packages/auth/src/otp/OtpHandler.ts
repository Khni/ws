import { LocalAuthContext } from "../../dist/local-auth-v2/LocalAuthContext.js";
import { IToken, ValidTimeString } from "../token/IToken.js";
import { ICreateOtpService } from "./interfaces/ICreateOtpService.js";
import { IVerifyOtpService } from "./interfaces/IVerifyOtpService.js";

export class OtpHandler<OtpType> {
  constructor(
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

  async request({ identifier }: { identifier: string }) {
    const otp = await this.createOtpService.execute({
      data: {
        otpType: this.otpType,
        recipient: identifier,
      },
    });
    const token = this.tokenService.sign(
      {
        identifier,
        otpType: this.otpType,
        verified: false,
      },
      { expiresIn: this.tokenExpiresIn }
    );
    return token;
  }

  async verify({ otp, token }: { otp: string; token: string }) {
    const payload = this.tokenService.verify(token);

    await this.verifyOtpService.execute({
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
  private verifyToken = (token: string) => {
    const payload = this.tokenService.verify(token);
    if (payload.otpType !== this.otpType) {
      throw new Error("OTP token Payload does not match wtih");
    }
    return payload;
  };

  async execute<TData>({
    data,
    token,
    fn,
  }: {
    data: TData;
    token: string;
    fn: (data: TData) => Promise<unknown>;
  }) {
    const payload = this.verifyToken(token);
    return await fn(data);
  }
}
