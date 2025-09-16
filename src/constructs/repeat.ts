import { encodeAtomic } from "../encoder.js";
import type { RegexConstruct, RegexSequence } from "../types.js";
import { ensureElements } from "../utils.js";

/**
 * Options for the `repeat` function.
 *
 * @param min - Minimum number of times to match.
 * @param max - Maximum number of times to match (default: unlimited).
 * @param greedy - Whether to use greedy quantifiers (default: true).
 */
export type RepeatOptions = number | { min: number; max?: number; greedy?: boolean };

/**
 * Creates a quantifier which matches the given sequence a specific number of times.
 *
 * @param sequence - Sequence to match.
 * @param options - Quantifier options.
 */
export function repeat(sequence: RegexSequence, options: RepeatOptions): RegexConstruct {
  const elements = ensureElements(sequence);

  if (typeof options === "number") {
    return {
      precedence: "sequence",
      pattern: `${encodeAtomic(elements)}{${options}}`,
    };
  }

  return {
    precedence: "sequence",
    pattern: `${encodeAtomic(elements)}{${options.min},${options?.max ?? ""}}${
      options.greedy === false ? "?" : ""
    }`,
  };
}
