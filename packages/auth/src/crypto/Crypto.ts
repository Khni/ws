import crypto from "crypto";

import { ICrypto } from "./ICrypto.js";

export class CryptoTokenGenerator implements ICrypto {
  generateHexToken(byteLength: number): string {
    return crypto.randomBytes(byteLength).toString("hex");
  }

  generateBase64UrlToken(byteLength: number): string {
    return crypto.randomBytes(byteLength).toString("base64url");
  }

  generateUUID(): string {
    return crypto.randomUUID();
  }
}
