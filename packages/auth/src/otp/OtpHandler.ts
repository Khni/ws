import { identifierSchema } from "../schemas/index.js";
import { IToken, ValidTimeString } from "../token/IToken.js";
import { Jwt } from "../token/Jwt.js";
import { CreateOtpService } from "./CreateOtpService.js";
import { ICreateOtpService } from "./interfaces/ICreateOtpService.js";
import { IOtpToken } from "./interfaces/IOtpToken.js";
import { IVerifyOtpService } from "./interfaces/IVerifyOtpService.js";
import { OtpSenderType, OtpTypeToOtpTokenExpiresInMapping } from "./types.js";
import jwt, { SignOptions, VerifyOptions } from "jsonwebtoken";

export class OtpHandler<OtpType extends string> {
  constructor(
    private createOtpService: ICreateOtpService<OtpType>,
    private verifyOtpService: IVerifyOtpService<OtpType>,
    private otpTypeToOtpTokenExpiresInMapping: OtpTypeToOtpTokenExpiresInMapping<OtpType>,
    private tokenService: IOtpToken<OtpType>,

    private indetifierTypeToSenderTypeMapping: {
      [key in "email" | "phone"]: OtpSenderType;
    }
  ) {}

  request = async ({
    identifier,
    senderType,
    otpType,
  }: {
    identifier: string;
    senderType?: OtpSenderType;
    otpType: OtpType;
  }) => {
    const { type, value } = identifierSchema.parse(identifier);
    const resolvedSenderType =
      senderType ?? this.indetifierTypeToSenderTypeMapping[type];
    const otp = await this.createOtpService.execute({
      data: {
        otpType: otpType,
        recipient: identifier,
        senderType: resolvedSenderType,
      },
    });
    const token = this.tokenService.sign(
      {
        identifier,
        otpType: otpType,
        verified: false,
      },

      { expiresIn: this.otpTypeToOtpTokenExpiresInMapping[otpType] }
    );
    return token;
  };

  async verify({
    otp,
    token,
    otpType,
  }: {
    otp: string;
    token: string;
    otpType: OtpType;
  }) {
    const payload = this.verifyToken({ token, otpType });

    await this.verifyOtpService.execute({
      otp: otp,
      type: otpType,
      identifier: payload?.identifier,
    });

    return this.tokenService.sign(
      {
        identifier: payload.identifier,
        otpType: payload.otpType,
        verified: true,
      },
      { expiresIn: this.otpTypeToOtpTokenExpiresInMapping[otpType] }
    );
  }
  private verifyToken = ({
    token,
    otpType,
  }: {
    token: string;
    otpType: OtpType;
  }) => {
    const payload = this.tokenService.verify(token);
    if (payload.otpType !== otpType) {
      throw new Error("Invalid OtpType for Token");
    }
    return payload;
  };
}
