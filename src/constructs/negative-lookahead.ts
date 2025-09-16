import { encode } from "../encoder.js";
import type { RegexConstruct, RegexSequence } from "../types.js";

/**
 * Negative lookahead assertion.
 *
 * A negative lookahead assertion is a zero-width assertion that matches a group of characters only if it is not followed by a specific group of characters.
 *
 * @example
 * ```ts
 * negativeLookahead("a");
 * // /(?=a)/
 *
 * negativeLookahead(["a", "b", "c"]);
 * // /(?=abc)/
 * ```
 */
export function negativeLookahead(sequence: RegexSequence): RegexConstruct {
  return {
    precedence: "atom",
    pattern: `(?!${encode(sequence).pattern})`,
  };
}
