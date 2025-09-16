import { encode } from "../encoder.js";
import type { RegexConstruct, RegexSequence } from "../types.js";

/**
 * Negative lookbehind assertion.
 *
 * A negative lookbehind assertion is a zero-width assertion that matches a group of characters only if it is not preceded by a specific group of characters.
 *
 * @example
 * ```ts
 * negativeLookbehind("a");
 * // /(?<!a)/
 *
 * negativeLookbehind(["a", "b", "c"]);
 * // /(?<!abc)/
 * ```
 */
export function negativeLookbehind(sequence: RegexSequence): RegexConstruct {
  return {
    precedence: "atom",
    pattern: `(?<!${encode(sequence).pattern})`,
  };
}
