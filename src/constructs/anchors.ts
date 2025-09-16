import type { RegexConstruct } from "../types.js";

/**
 * Start of string anchor. Matches the start of of string. In `multiline` mode, also matches immediately following a newline.
 */
export const startOfString: RegexConstruct = {
  precedence: "atom",
  pattern: "^",
};

/**
 * End of string anchor. Matches the end of a string. In `multiline` mode, also matches immediately preceding a newline.
 */
export const endOfString: RegexConstruct = {
  precedence: "atom",
  pattern: "$",
};

/**
 * Word boundary anchor. Matches the position where one side is a word character (alphanumeric or underscore) and the other side is a non-word character (anything else).
 */
export const wordBoundary: RegexConstruct = {
  precedence: "atom",
  pattern: "\\b",
};

/**
 * Non-word boundary anchor. Matches the position where both sides are word characters.
 */
export const nonWordBoundary: RegexConstruct = {
  precedence: "atom",
  pattern: "\\B",
};

/**
 * @deprecated Renamed to `nonWordBoundary`.
 */
export const notWordBoundary = nonWordBoundary;
