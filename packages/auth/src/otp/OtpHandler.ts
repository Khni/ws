import { identifierSchema } from "../schemas/index.js";
import { IToken, ValidTimeString } from "../token/IToken.js";
import { Jwt } from "../token/Jwt.js";
import { CreateOtpService } from "./CreateOtpService.js";
import { ICreateOtpService } from "./interfaces/ICreateOtpService.js";
import { IVerifyOtpService } from "./interfaces/IVerifyOtpService.js";
import { OtpSenderType } from "./types.js";
import jwt, { SignOptions, VerifyOptions } from "jsonwebtoken";

export class OtpHandler<
  OtpType,
  ExecuteFnTData extends { identifier: string },
  ExecuteFnReturnType,
> {
  constructor(
    private createOtpService: ICreateOtpService<OtpType>,
    private verifyOtpService: IVerifyOtpService<OtpType>,
    private tokenService: IToken<{
      identifier: string;
      otpType: OtpType;
      verified: boolean;
    }>,
    private otpType: OtpType,
    private executeFn: ({
      data,
    }: {
      data: ExecuteFnTData & { identifier: string };
    }) => Promise<ExecuteFnReturnType>,
    private otpTokenExpiresIn: ValidTimeString = "10m",
    private indetifierTypeToSenderTypeMapping: {
      [key in "email" | "phone"]: OtpSenderType;
    }
  ) {}

  request = async ({
    identifier,
    senderType,
  }: {
    identifier: string;
    senderType?: OtpSenderType;
  }) => {
    const { type, value } = identifierSchema.parse(identifier);
    const resolvedSenderType =
      senderType ?? this.indetifierTypeToSenderTypeMapping[type];
    const otp = await this.createOtpService.execute({
      data: {
        otpType: this.otpType,
        recipient: identifier,
        senderType: resolvedSenderType,
      },
    });
    const token = this.tokenService.sign(
      {
        identifier,
        otpType: this.otpType,
        verified: false,
      },

      { expiresIn: this.otpTokenExpiresIn }
    );
    return token;
  };

  async verify({ otp, token }: { otp: string; token: string }) {
    const payload = this.tokenService.verify(token);

    await this.verifyOtpService.execute({
      otp: otp,
      type: this.otpType,
      identifier: payload?.identifier,
    });

    return this.tokenService.sign(
      {
        identifier: payload.identifier,
        otpType: payload.otpType,
        verified: true,
      },
      { expiresIn: this.otpTokenExpiresIn }
    );
  }
  private verifyToken = (token: string) => {
    const payload = this.tokenService.verify(token);
    if (payload.otpType !== this.otpType) {
      throw new Error("Invalid OtpType for Token");
    }
    return payload;
  };

  async execute({
    data,
    token,
  }: {
    data: Omit<ExecuteFnTData, "identifier">;
    token: string;
  }) {
    const { identifier, verified } = this.verifyToken(token);
    if (!verified) {
      throw new Error("OTP is not verified");
    }
    return await this.executeFn({
      data: { ...data, identifier } as ExecuteFnTData,
    });
  }
}
