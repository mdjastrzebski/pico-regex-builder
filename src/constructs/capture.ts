import { encode } from "../encoder.js";
import type { RegexConstruct, RegexSequence } from "../types.js";

export type CaptureOptions = {
  /**
   * Name to be given to the capturing group.
   */
  name?: string;
};

export interface Reference extends RegexConstruct {
  name: string;
}

/**
 * Creates a capturing group which allows the matched pattern to be available:
 * - in the match results (`String.match`, `String.matchAll`, or `RegExp.exec`)
 * - in the regex itself, through {@link ref}
 */
export function capture(sequence: RegexSequence, options?: CaptureOptions): RegexConstruct {
  const name = options?.name;
  if (name) {
    return {
      precedence: "atom",
      pattern: `(?<${name}>${encode(sequence).pattern})`,
    };
  }

  return {
    precedence: "atom",
    pattern: `(${encode(sequence).pattern})`,
  };
}

/**
 * Creates a reference, also known as backreference, which allows matching
 * again the exact text that a capturing group previously matched.
 *
 * In order to form a valid regex, the reference must use the same name as
 * a capturing group earlier in the expression.
 *
 * @param name - Name of the capturing group to reference.
 */
export function ref(name: string): Reference {
  return {
    precedence: "atom",
    pattern: `\\k<${name}>`,
    name,
  };
}
