import { describe, it, expect } from "vitest";
import { parseTimeString } from "./parseTimeString.js";
import { ValidTimeString } from "./types.js";

describe("parseTimeString", () => {
  const cases: Array<[ValidTimeString, number, string, string]> = [
    ["1ms", 1, "ms", "millisecond"],
    ["2ms", 2, "ms", "milliseconds"],

    ["1s", 1, "s", "second"],
    ["5s", 5, "s", "seconds"],

    ["1m", 1, "m", "minute"],
    ["10m", 10, "m", "minutes"],

    ["1h", 1, "h", "hour"],
    ["12h", 12, "h", "hours"],

    ["1d", 1, "d", "day"],
    ["7d", 7, "d", "days"],
  ];

  it.each(cases)(
    "parses %s correctly",
    (input, expectedNumber, expectedUnit, expectedHuman) => {
      const result = parseTimeString(input);
      expect(result.timeValue).toBe(expectedNumber);

      expect(result.timeUnit).toBe(expectedHuman);
    }
  );

  it("throws on invalid string", () => {
    expect(() => parseTimeString("abc" as ValidTimeString)).toThrow();
    expect(() => parseTimeString("10x" as ValidTimeString)).toThrow();
    expect(() => parseTimeString("h10" as ValidTimeString)).toThrow();
  });
});
