import { encode } from "../encoder.js";
import type { RegexConstruct, RegexSequence } from "../types.js";

/**
 * Positive lookbehind assertion.
 *
 * A positive lookbehind assertion is a zero-width assertion that matches a group of characters only if it is preceded by a specific group of characters.
 *
 * @example
 * ```ts
 * lookbehind("a");
 * // /(?<=a)/
 *
 * lookbehind(["a", "b", "c"]);
 * // /(?<=abc)/
 * ```
 */
export function lookbehind(sequence: RegexSequence): RegexConstruct {
  return {
    precedence: "atom",
    pattern: `(?<=${encode(sequence).pattern})`,
  };
}
