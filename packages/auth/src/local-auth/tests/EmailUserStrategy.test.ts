import { describe, beforeEach, it, expect, Mocked } from "vitest";
import { EmailUserStrategy } from "../EmailUserStrategy.js";
import { mockUserRepository } from "../../repositories/interfaces/mocks.js";
import { mockedUser } from "./data.js";

describe("EmailUserStrategy", () => {
  let strategy: EmailUserStrategy;

  beforeEach(() => {
    strategy = new EmailUserStrategy(mockUserRepository);
  });

  describe("find", () => {
    it("should call userRepository.findUnique with correct email", async () => {
      mockUserRepository.findUnique.mockResolvedValue(mockedUser);

      const result = await strategy.find({ identifier: mockedUser.email });

      expect(mockUserRepository.findUnique).toHaveBeenCalledWith({
        where: { email: mockedUser.email },
      });
      expect(result).toEqual(mockedUser);
    });

    it("should return null if no user is found", async () => {
      mockUserRepository.findUnique.mockResolvedValue(null);

      const result = await strategy.find({
        identifier: "notfound@example.com",
      });

      expect(result).toBeNull();
    });

    it("should propagate repository errors", async () => {
      mockUserRepository.findUnique.mockRejectedValue(new Error("DB error"));

      await expect(strategy.find({ identifier: "x" })).rejects.toThrow(
        "DB error"
      );
    });
  });

  describe("create", () => {
    const createParams = {
      firstName: mockedUser.firstName,
      lastName: mockedUser.lastName,
      password: mockedUser.password,
      identifier: mockedUser.email,
      verified: mockedUser.verified,
    };

    it("should call userRepository.create with correct data", async () => {
      mockUserRepository.create.mockResolvedValue(mockedUser);

      const result = await strategy.create(createParams);

      expect(mockUserRepository.create).toHaveBeenCalledWith({
        data: {
          firstName: mockedUser.firstName,
          lastName: mockedUser.lastName,
          password: mockedUser.password,
          email: mockedUser.email,
          verified: mockedUser.verified,
        },
      });
      expect(result).toEqual(mockedUser);
    });

    it("should throw if repository.create fails", async () => {
      mockUserRepository.create.mockRejectedValue(new Error("Create failed"));

      await expect(strategy.create(createParams)).rejects.toThrow(
        "Create failed"
      );
    });
  });

  describe("update", () => {
    const updateParams = {
      identifier: mockedUser.email,
      data: { firstName: mockedUser.firstName },
    };

    it("should call userRepository.update with correct where and data", async () => {
      mockUserRepository.update.mockResolvedValue(mockedUser);

      const result = await strategy.update(updateParams);

      expect(mockUserRepository.update).toHaveBeenCalledWith({
        where: { email: mockedUser.email },
        data: { firstName: mockedUser.firstName },
      });
      expect(result).toEqual(mockedUser);
    });

    it("should propagate repository errors", async () => {
      mockUserRepository.update.mockRejectedValue(new Error("Update failed"));

      await expect(strategy.update(updateParams)).rejects.toThrow(
        "Update failed"
      );
    });
  });
});
