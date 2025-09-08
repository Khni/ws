import { IUserRepository } from "./IUserRepository.js";
import { Mocked, vi } from "vitest";
export const mockUserRepository: Mocked<IUserRepository> = {
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
};
