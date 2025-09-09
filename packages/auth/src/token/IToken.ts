export interface IToken<Payload> {
  sign(payload: Payload): string;
  verify(token: string): Payload | null;
}
