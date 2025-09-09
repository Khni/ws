export interface ICrypto {
  generateHexToken(byteLength: number): string;
  generateBase64UrlToken(byteLength: number): string;
  generateUUID(): string;
}
