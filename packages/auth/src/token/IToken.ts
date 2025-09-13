type TimeUnit = "ms" | "s" | "m" | "h" | "d";
export type ValidTimeString = `${number}${TimeUnit}`;
export type SignTokenOptions = { expiresIn: ValidTimeString };
export interface IToken<Payload> {
  sign(payload: Payload, options: SignTokenOptions): string;
  verify(token: string): Payload | null;
}
