import type { RegexSequence } from "../index.js";
import { wrapRegExp } from "./utils.js";

export function toEqualRegex(
  this: jest.MatcherContext,
  received: RegExp | RegexSequence,
  expected: RegExp | string,
) {
  received = wrapRegExp(received);

  const options = {
    isNot: this.isNot,
  };

  const expectedSource = typeof expected === "string" ? expected : expected.source;
  const expectedFlags = typeof expected === "string" ? undefined : expected.flags;

  return {
    pass:
      expectedSource === received.source &&
      (expectedFlags === undefined || expectedFlags === received.flags),
    message: () =>
      this.utils.matcherHint("toEqualRegex", undefined, undefined, options) +
      "\n\n" +
      `Expected: ${this.isNot ? "not " : ""}${this.utils.printExpected(expected)}\n` +
      `Received: ${this.utils.printReceived(received)}`,
  };
}

expect.extend({ toEqualRegex });

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace jest {
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type, @typescript-eslint/no-unused-vars
    interface Matchers<R, T = {}> {
      toEqualRegex(expected: RegExp | string): R;
    }
  }
}
