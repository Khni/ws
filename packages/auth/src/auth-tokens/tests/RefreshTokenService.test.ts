import { describe, beforeEach, it, expect, vi } from "vitest";
import { RefreshTokenService } from "../RefreshTokenService.js";
import {
  mockRefreshTokenRepository,
  mockUserRepository,
} from "../../repositories/interfaces/mocks.js";
import { mockCrypto } from "../../crypto/mocks.js";
import { mockedUser } from "../../local-auth/tests/data.js";
import { mockedRefreshToken } from "./data.js";
import { AuthDomainError } from "@khaled/auth-errors";
import { AuthUnexpectedError } from "@khaled/auth-errors";
import { generateExpiredDate } from "@khaled/utils";

describe("RefreshTokenService", () => {
  let refreshTokenService: RefreshTokenService;
  const validFutureDate = new Date(Date.now() + 1000 * 60 * 60); // 1 hour in future
  const expiredDate = new Date(Date.now() - 1000 * 60 * 60); // 1 hour ago

  beforeEach(() => {
    vi.clearAllMocks();
    refreshTokenService = new RefreshTokenService(
      mockRefreshTokenRepository,
      mockCrypto,
      vi.fn(),
      "1h",
      mockUserRepository
    );
  });

  describe("create", () => {
    it("should create and return a refresh token", async () => {
      const generatedToken = "mocked-token-123";
      mockCrypto.generateBase64UrlToken.mockReturnValue(generatedToken);
      mockRefreshTokenRepository.create.mockResolvedValue({
        ...mockedRefreshToken,
        token: generatedToken,
        expiresAt: validFutureDate,
        userId: mockedUser.id,
      });

      const result = await refreshTokenService.create(mockedUser.id);

      expect(mockCrypto.generateBase64UrlToken).toHaveBeenCalledWith(40);
      expect(mockRefreshTokenRepository.create).toHaveBeenCalledWith({
        data: {
          token: generatedToken,
          expiresAt: validFutureDate,
          userId: mockedUser.id,
        },
        tx: undefined,
      });
      expect(result.token).toBe(generatedToken);
    });

    it("should throw AuthUnexpectedError if repository.create fails", async () => {
      mockRefreshTokenRepository.create.mockRejectedValue(
        new Error("DB Create Failed")
      );

      await expect(refreshTokenService.create(mockedUser.id)).rejects.toThrow(
        AuthUnexpectedError
      );
    });
  });

  describe("verify", () => {
    it("should verify and return userId when token is valid", async () => {
      mockRefreshTokenRepository.findUnique.mockResolvedValue({
        ...mockedRefreshToken,
        expiresAt: validFutureDate,
        revokedAt: null,
      });
      mockUserRepository.findUnique.mockResolvedValue(mockedUser);

      const result = await refreshTokenService.verify({
        token: mockedRefreshToken.token,
      });

      expect(mockRefreshTokenRepository.findUnique).toHaveBeenCalledWith({
        where: { token: mockedRefreshToken.token },
      });
      expect(mockUserRepository.findUnique).toHaveBeenCalledWith({
        where: { id: mockedRefreshToken.userId },
      });
      expect(result).toEqual({ userId: mockedRefreshToken.userId });
    });

    it("should throw AuthDomainError if refresh token does not exist", async () => {
      mockRefreshTokenRepository.findUnique.mockResolvedValue(null);

      await expect(
        refreshTokenService.verify({ token: mockedRefreshToken.token })
      ).rejects.toThrow(AuthDomainError);
    });

    it("should throw AuthDomainError if refresh token is expired", async () => {
      mockRefreshTokenRepository.findUnique.mockResolvedValue({
        ...mockedRefreshToken,
        expiresAt: expiredDate,
      });

      await expect(
        refreshTokenService.verify({ token: mockedRefreshToken.token })
      ).rejects.toThrow(AuthDomainError);
    });

    it("should throw AuthDomainError if refresh token is revoked", async () => {
      mockRefreshTokenRepository.findUnique.mockResolvedValue({
        ...mockedRefreshToken,
        revokedAt: new Date(),
      });

      await expect(
        refreshTokenService.verify({ token: mockedRefreshToken.token })
      ).rejects.toThrow(AuthDomainError);
    });

    it("should throw AuthDomainError if user does not exist", async () => {
      mockRefreshTokenRepository.findUnique.mockResolvedValue({
        ...mockedRefreshToken,
        expiresAt: validFutureDate,
        revokedAt: null,
      });
      mockUserRepository.findUnique.mockResolvedValue(null);

      await expect(
        refreshTokenService.verify({ token: mockedRefreshToken.token })
      ).rejects.toThrow(AuthDomainError);
    });

    it("should throw AuthUnexpectedError if repository throws unexpected error", async () => {
      mockRefreshTokenRepository.findUnique.mockRejectedValue(
        new Error("DB Error")
      );

      await expect(
        refreshTokenService.verify({ token: mockedRefreshToken.token })
      ).rejects.toThrow(AuthUnexpectedError);
    });
  });

  describe("revoke", () => {
    it("should revoke a refresh token successfully", async () => {
      const revokedToken = {
        ...mockedRefreshToken,
        revokedAt: new Date(),
      };
      mockRefreshTokenRepository.update.mockResolvedValue(revokedToken);

      const result = await refreshTokenService.revoke({
        token: mockedRefreshToken.token,
      });

      expect(mockRefreshTokenRepository.update).toHaveBeenCalledWith({
        where: { token: mockedRefreshToken.token },
        data: { revokedAt: expect.any(Date) },
      });
      expect(result.revokedAt).toBeInstanceOf(Date);
    });

    it("should throw AuthUnexpectedError if repository.update fails", async () => {
      mockRefreshTokenRepository.update.mockRejectedValue(
        new Error("DB Update Failed")
      );

      await expect(
        refreshTokenService.revoke({ token: mockedRefreshToken.token })
      ).rejects.toThrow(AuthUnexpectedError);
    });
  });
});
