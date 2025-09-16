import type { RegexSequence } from "../index.js";
import { buildRegExp } from "../index.js";

export function wrapRegExp(regex: RegExp | RegexSequence) {
  if (regex instanceof RegExp) {
    return regex;
  }

  return buildRegExp(regex);
}
