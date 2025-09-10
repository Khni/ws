export interface IOtpSenderStrategy {
  send(): Promise<void>;
}
