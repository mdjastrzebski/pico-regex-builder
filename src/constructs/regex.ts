import { encode } from "../encoder.js";
import type { RegexConstruct, RegexSequence } from "../types.js";

/**
 * Groups the given sequence into a single element.
 *
 * @param sequence - Sequence to group.
 */
export function regex(sequence: RegexSequence): RegexConstruct {
  return encode(sequence);
}
