import { IRefreshTokenRepository } from "./IRefreshTokenRepository.js";
import { IUserRepository } from "./IUserRepository.js";
import { Mocked, vi } from "vitest";

function createMockRepository<T>(): Mocked<T> {
  return {
    count: vi.fn(),
    create: vi.fn(),
    createTransaction: vi.fn().mockImplementation(async (callback) => {
      const fakeTx = {}; // a fake transaction object
      return callback(fakeTx);
    }),
    delete: vi.fn(),
    findMany: vi.fn(),
    findUnique: vi.fn(),
    update: vi.fn(),
  } as unknown as Mocked<T>;
}

export const mockUserRepository = createMockRepository<IUserRepository>();
export const mockRefreshTokenRepository =
  createMockRepository<IRefreshTokenRepository>();
