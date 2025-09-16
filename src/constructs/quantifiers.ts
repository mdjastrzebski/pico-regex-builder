import { encodeAtomic } from "../encoder.js";
import type { RegexConstruct, RegexSequence } from "../types.js";
import { ensureElements } from "../utils.js";

export interface QuantifierOptions {
  greedy?: boolean;
}

/**
 * Creates a quantifier which matches zero or more of the given elements.
 *
 * @param sequence - Elements to match zero or more of.
 * @param options - Quantifier options.
 */
export function zeroOrMore(sequence: RegexSequence, options?: QuantifierOptions): RegexConstruct {
  const elements = ensureElements(sequence);
  return {
    precedence: "sequence",
    pattern: `${encodeAtomic(elements)}*${options?.greedy === false ? "?" : ""}`,
  };
}

/**
 * Creates a quantifier which matches one or more of the given elements.
 *
 * @param sequence - Elements to match one or more of.
 * @param options - Quantifier options.
 */
export function oneOrMore(sequence: RegexSequence, options?: QuantifierOptions): RegexConstruct {
  const elements = ensureElements(sequence);
  return {
    precedence: "sequence",
    pattern: `${encodeAtomic(elements)}+${options?.greedy === false ? "?" : ""}`,
  };
}

/**
 * Creates a quantifier which matches zero or one of the given elements.
 *
 * @param sequence - Elements to match zero or one of.
 * @param options - Quantifier options.
 */
export function optional(sequence: RegexSequence, options?: QuantifierOptions): RegexConstruct {
  const elements = ensureElements(sequence);
  return {
    precedence: "sequence",
    pattern: `${encodeAtomic(elements)}?${options?.greedy === false ? "?" : ""}`,
  };
}
