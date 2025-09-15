export interface IVerifyOtpService<OtpType> {
  execute({
    identifier,
    otp,
    type,
  }: {
    identifier: string;
    otp: string;
    type: OtpType;
  }): Promise<{ token: string }>;
}
