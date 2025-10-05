import { describe, beforeEach, it, expect, vi, Mocked } from "vitest";
import { mockHasher } from "../../hasher/mocks.js";
import { mockedUser } from "./data.js";
import { LocalAuthContext } from "../LocalAuthContext.js";
import { ILocalUserStrategy } from "../interfaces/ILocalUserStrategy.js";
import { AuthDomainError } from "@khaled/auth-errors";
import { AuthUnexpectedError } from "@khaled/auth-errors";
import {
  mockUserEmailStrategy,
  mockUserPhoneStrategy,
} from "../interfaces/mocks.js";

describe("LocalAuthContext", () => {
  let localAuthContext: LocalAuthContext;

  beforeEach(() => {
    vi.clearAllMocks();
    localAuthContext = new LocalAuthContext(
      [mockUserEmailStrategy, mockUserPhoneStrategy],
      mockHasher
    );
  });

  describe("getStrategy", () => {
    it("should return the correct strategy for a valid identifier type", () => {
      const strategy = localAuthContext.getStrategy("email");
      expect(strategy).toBe(mockUserEmailStrategy);
    });

    it("should throw an error when no matching strategy is found", () => {
      expect(() =>
        localAuthContext.getStrategy("username" as any)
      ).toThrowError("There is no UserStrategy matchs with: username");
    });
  });

  describe("createUser", () => {
    it("should create a user when identifier is not already used", async () => {
      mockUserEmailStrategy.find.mockResolvedValueOnce(null);
      mockHasher.hash.mockResolvedValueOnce("hashedPassword");
      mockUserEmailStrategy.create.mockResolvedValueOnce(mockedUser);

      const result = await localAuthContext.createUser({
        authIdentifierType: "email",
        data: {
          identifier: mockedUser.email,
          password: "plainPass",
          firstName: mockedUser.firstName,
          lastName: mockedUser.lastName,
          verified: mockedUser.verified,
        },
      });

      expect(mockUserEmailStrategy.find).toHaveBeenCalledWith({
        identifier: mockedUser.email,
      });
      expect(mockHasher.hash).toHaveBeenCalledWith("plainPass");
      expect(mockUserEmailStrategy.create).toHaveBeenCalledWith({
        identifier: mockedUser.email,
        password: "hashedPassword",
        firstName: mockedUser.firstName,
        lastName: mockedUser.lastName,
        verified: mockedUser.verified,
      });
      expect(result).toBe(mockedUser);
    });

    it("should throw AuthDomainError when user already exists", async () => {
      mockUserEmailStrategy.find.mockResolvedValueOnce(mockedUser);

      await expect(
        localAuthContext.createUser({
          authIdentifierType: "email",
          data: {
            identifier: mockedUser.email,
            password: "pass",
            firstName: mockedUser.firstName,
            lastName: mockedUser.lastName,
            verified: mockedUser.verified,
          },
        })
      ).rejects.toThrow(AuthDomainError);
    });

    it("should wrap unexpected errors into AuthUnexpectedError", async () => {
      mockUserEmailStrategy.find.mockRejectedValueOnce(new Error("DB Error"));

      await expect(
        localAuthContext.createUser({
          authIdentifierType: "email",
          data: {
            identifier: mockedUser.email,
            password: "pass",
            firstName: mockedUser.firstName,
            lastName: mockedUser.lastName,
            verified: mockedUser.verified,
          },
        })
      ).rejects.toThrow(AuthUnexpectedError);
    });
  });

  describe("verifyPassword", () => {
    it("should return user when password matches", async () => {
      mockUserEmailStrategy.find.mockResolvedValueOnce(mockedUser);
      mockHasher.compare.mockResolvedValueOnce(true);

      const result = await localAuthContext.verifyPassword({
        authIdentifierType: "email",
        data: { identifier: mockedUser.email, password: "correctPass" },
      });

      expect(mockUserEmailStrategy.find).toHaveBeenCalledWith({
        identifier: mockedUser.email,
      });
      expect(mockHasher.compare).toHaveBeenCalledWith(
        "correctPass",
        mockedUser.password
      );
      expect(result).toBe(mockedUser);
    });

    it("should throw AuthDomainError if user is not found", async () => {
      mockUserEmailStrategy.find.mockResolvedValueOnce(null);

      await expect(
        localAuthContext.verifyPassword({
          authIdentifierType: "email",
          data: { identifier: mockedUser.email, password: "pass" },
        })
      ).rejects.toThrow(AuthDomainError);
    });

    it("should throw AuthDomainError if user has no password (not local)", async () => {
      mockUserEmailStrategy.find.mockResolvedValueOnce({
        ...mockedUser,
        password: null,
      });

      await expect(
        localAuthContext.verifyPassword({
          authIdentifierType: "email",
          data: { identifier: mockedUser.email, password: "pass" },
        })
      ).rejects.toThrow(AuthDomainError);
    });

    it("should throw AuthDomainError if password does not match", async () => {
      mockUserEmailStrategy.find.mockResolvedValueOnce(mockedUser);
      mockHasher.compare.mockResolvedValueOnce(false);

      await expect(
        localAuthContext.verifyPassword({
          authIdentifierType: "email",
          data: { identifier: mockedUser.email, password: "wrongPass" },
        })
      ).rejects.toThrow(AuthDomainError);
    });

    it("should wrap unexpected errors into AuthUnexpectedError", async () => {
      mockUserEmailStrategy.find.mockRejectedValueOnce(new Error("DB Error"));

      await expect(
        localAuthContext.verifyPassword({
          authIdentifierType: "email",
          data: { identifier: mockedUser.email, password: "pass" },
        })
      ).rejects.toThrow(AuthUnexpectedError);
    });
  });

  describe("resetPassword", () => {
    it("should update user password and return updated user", async () => {
      mockHasher.hash.mockResolvedValueOnce("newHashedPassword");
      mockUserEmailStrategy.update.mockResolvedValueOnce(mockedUser);

      const result = await localAuthContext.resetPassword({
        authIdentifierType: "email",
        data: { identifier: mockedUser.email, newPassword: "newPass" },
      });

      expect(mockHasher.hash).toHaveBeenCalledWith("newPass");
      expect(mockUserEmailStrategy.update).toHaveBeenCalledWith({
        identifier: mockedUser.email,
        data: { password: "newHashedPassword" },
      });
      expect(result).toBe(mockedUser);
    });

    it("should wrap unexpected errors into AuthUnexpectedError", async () => {
      mockUserEmailStrategy.update.mockRejectedValueOnce(new Error("DB Error"));

      await expect(
        localAuthContext.resetPassword({
          authIdentifierType: "email",
          data: { identifier: mockedUser.email, newPassword: "newPass" },
        })
      ).rejects.toThrow(AuthUnexpectedError);
    });
  });
});
