import { AuthDomainError, AuthDomainErrorCodes } from "@khaled/auth-errors";
import { identifierSchema } from "../schemas/index.js";

import { ICreateOtpService } from "./interfaces/ICreateOtpService.js";
import { IOtpToken } from "./interfaces/IOtpToken.js";
import { IVerifyOtpService } from "./interfaces/IVerifyOtpService.js";
import { OtpSenderType, OtpTypeToOtpTokenExpiresInMapping } from "./types.js";

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
    console.log("RequestedData:", { identifier, otpType, otp, token });
    console.log("Request token:", token);
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
    console.log("Verify token:", token);
    console.log("Verifying OTP of type:", otpType);
    const payload = this.verifyToken({ token, otpType });

    await this.verifyOtpService.execute({
      otp: otp,
      type: otpType,
      identifier: payload?.identifier,
    });

    const _token = this.tokenService.sign(
      {
        identifier: payload.identifier,
        otpType: payload.otpType,
        verified: true,
      },
      { expiresIn: this.otpTypeToOtpTokenExpiresInMapping[otpType] }
    );

    return _token;
  }
  private verifyToken = ({
    token,
    otpType,
  }: {
    token: string;
    otpType: OtpType;
  }) => {
    console.log("Verifying token:", token);
    let payload: { identifier: string; otpType: OtpType; verified: boolean };
    try {
      payload = this.tokenService.verify(token);
    } catch (error: any) {
      console.log(error);
      throw new AuthDomainError("OTP_TOKEN_INVALID", error.message);
    }

    if (payload.otpType !== otpType) {
      throw new Error("Invalid OtpType for Token");
    }
    return payload;
  };
}
