import { describe, it, expect, vi } from "vitest";
import { createConfig } from "./create-config.js";

type TestConfig = {
  count: number;
  logger: {
    info: (msg: string) => void;
  };
};
const mockLoger = {
  info: vi.fn(),
};
describe("test config generic closure", () => {
  it("throws error if testConfig not initialized", () => {
    const testConfig = createConfig<TestConfig>("test");
    expect(() => testConfig.get()).toThrowError(
      "[testConfig] is not initialized."
    );
  });
  it("return initialized value", () => {
    const testConfig = createConfig<TestConfig>("test");
    testConfig.set({ count: 5, logger: mockLoger });
    expect(testConfig.get().count).toEqual(5);
  });
  it("return initialized value", () => {
    const testConfig = createConfig<TestConfig>("test");
    testConfig.set({ count: 5, logger: mockLoger });
    expect(mockLoger.info).toHaveBeenCalledWith(`[testConfig] initialized`);
  });
});
