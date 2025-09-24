// Jwt.test.ts
import { describe, it, expect } from "vitest";
import jwt from "jsonwebtoken";
import { Jwt } from "../Jwt.js";

describe("Jwt Integration", () => {
  const secret = "super-secret-key";
  const payload = { userId: "123", role: "admin" };

  it("should sign and verify a token correctly", () => {
    const myJwt = new Jwt<typeof payload>(secret);

    const token = myJwt.sign(payload, { expiresIn: "1h" });
    expect(typeof token).toBe("string");

    // Verify with class
    const verified = myJwt.verify(token);
    expect(verified).toMatchObject(payload);

    // Cross-verify with pure jsonwebtoken
    const rawVerified = jwt.verify(token, secret);
    expect(rawVerified).toMatchObject(payload);
  });

  it("should throw AuthDomainError if expired", async () => {
    const myJwt = new Jwt<typeof payload>(secret);

    const token = myJwt.sign(payload, { expiresIn: "1s" });

    // wait until token expires
    await new Promise((r) => setTimeout(r, 1100));

    expect(() => myJwt.verify(token)).toThrowError("TOKEN_EXPIRED");
  });

  it("should throw if secret is wrong", () => {
    const myJwt = new Jwt<typeof payload>(secret);
    const token = myJwt.sign(payload, { expiresIn: "1h" });

    const wrongJwt = new Jwt<typeof payload>("wrong-secret");

    expect(() => wrongJwt.verify(token)).toThrowError(jwt.JsonWebTokenError);
  });
});
