import { TimeUnit, ValidTimeString } from "./types.js";

const unitMap: Record<TimeUnit, { singular: string; plural: string }> = {
  ms: { singular: "millisecond", plural: "milliseconds" },
  s: { singular: "second", plural: "seconds" },
  m: { singular: "minute", plural: "minutes" },
  h: { singular: "hour", plural: "hours" },
  d: { singular: "day", plural: "days" },
};

export function parseTimeString(input: ValidTimeString) {
  const match = input.match(/^(\d+)(ms|s|m|h|d)$/);

  if (!match) {
    throw new Error(`Invalid time string: ${input}`);
  }

  const [, rawValue, timeUnit] = match;
  const timeValue = Number(rawValue);
  const names = unitMap[timeUnit as TimeUnit];

  return {
    timeValue,
    timeUnit: timeValue === 1 ? names.singular : names.plural,
  };
}
