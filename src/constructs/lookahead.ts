import { encode } from "../encoder.js";
import type { RegexConstruct, RegexSequence } from "../types.js";

/**
 * Positive lookahead assertion.
 *
 * A positive lookahead assertion is a zero-width assertion that matches a group of characters only if it is followed by a specific group of characters.
 *
 * @example
 * ```ts
 * lookahead("a");
 * // /(?=a)/
 *
 * lookahead(["a", "b", "c"]);
 * // /(?=abc)/
 * ```
 */
export function lookahead(sequence: RegexSequence): RegexConstruct {
  return {
    precedence: "atom",
    pattern: `(?=${encode(sequence).pattern})`,
  };
}
