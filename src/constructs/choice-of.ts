import { encode } from "../encoder.js";
import type { RegexConstruct, RegexSequence } from "../types.js";

/**
 * Creates a disjunction (choice of) which matches any of the alternatives.
 *
 * @param alternatives - Alternatives to choose from.
 * @returns Choice of alternatives.
 */
export function choiceOf(...alternatives: RegexSequence[]): RegexConstruct {
  if (alternatives.length === 0) {
    throw new Error("Expected at least one alternative");
  }

  const encodedAlternatives = alternatives.map((c) => encode(c));
  if (encodedAlternatives.length === 1) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return encodedAlternatives[0]!;
  }

  return {
    precedence: "disjunction",
    pattern: encodedAlternatives.map((n) => n.pattern).join("|"),
  };
}
