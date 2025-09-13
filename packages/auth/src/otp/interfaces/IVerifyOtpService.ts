export interface IVerifyOtpService<OtpType> {
  execute({
    userId,
    otp,
    type,
  }: {
    userId: string;
    otp: string;
    type: OtpType;
  }): Promise<boolean>;
}
