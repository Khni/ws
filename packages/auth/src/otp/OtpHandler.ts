import { IToken, ValidTimeString } from "../token/IToken.js";
import { Jwt } from "../token/jwt.js";
import { CreateOtpService } from "./CreateOtpService.js";
import { ICreateOtpService } from "./interfaces/ICreateOtpService.js";
import { IVerifyOtpService } from "./interfaces/IVerifyOtpService.js";
import { OtpSenderType } from "./types.js";
import jwt, { SignOptions, VerifyOptions } from "jsonwebtoken";

export class OtpHandler<OtpType, ExecuteFnTData> {
  constructor(
    private createOtpService: ICreateOtpService<OtpType>,
    private verifyOtpService: IVerifyOtpService<OtpType>,
    private tokenService: IToken<{
      identifier: string;
      otpType: OtpType;
      verified: boolean;
    }>,
    private otpType: OtpType,
    private executeFn: (
      data: ExecuteFnTData & { identifier: string }
    ) => Promise<unknown>,
    private tokenExpiresIn: ValidTimeString = "10m"
  ) {}

  async request({
    identifier,
    senderType,
  }: {
    identifier: string;
    senderType: OtpSenderType;
  }) {
    const otp = await this.createOtpService.execute({
      data: {
        otpType: this.otpType,
        recipient: identifier,
        senderType,
      },
    });
    const token = jwt.sign(
      {
        identifier,
        otpType: this.otpType,
        verified: false,
      },
      "secret",
      { expiresIn: this.tokenExpiresIn }
    );
    return token;
  }

  async verify({ otp, token }: { otp: string; token: string }) {
    console.log(token);
    const payload = jwt.verify(token, "secret");
    console.log(payload, "PayLoad");

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

  async execute({ data, token }: { data: ExecuteFnTData; token: string }) {
    const { identifier } = this.verifyToken(token);
    return await this.executeFn({ ...data, identifier });
  }
}
