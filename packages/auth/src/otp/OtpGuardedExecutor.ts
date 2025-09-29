import { IOtpToken } from "./interfaces/IOtpToken.js";

export class OtpGuardedExecutor<
  OtpType,
  ExecuteFnTData extends { identifier: string },
  ExecuteFnReturnType,
> {
  constructor(
    private otpType: OtpType,
    private tokenService: IOtpToken<OtpType>,

    private executeFn: ({
      data,
    }: {
      data: ExecuteFnTData & { identifier: string };
    }) => Promise<ExecuteFnReturnType>
  ) {}

  private verifyToken({ token, otpType }: { token: string; otpType: OtpType }) {
    const payload = this.tokenService.verify(token);
    if (payload.otpType !== otpType || !payload.verified) {
      throw new Error("Invalid  OTP");
    }
    return payload.identifier;
  }

  async execute({
    data,
    token,
  }: {
    data: Omit<ExecuteFnTData, "identifier">;
    token: string;
  }) {
    const identifier = this.verifyToken({ token, otpType: this.otpType });

    return await this.executeFn({
      data: { ...data, identifier } as ExecuteFnTData,
    });
  }
}
