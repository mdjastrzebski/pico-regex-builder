export type ArrayOrSingle<T> = T[] | T;

/**
 * Sequence of regex elements forming a regular expression.
 *
 * For developer convenience it also accepts a single element instead of array.
 */
export type RegexSequence = RegexElement[] | RegexElement;

/**
 * Fundamental building block of a regular expression, defined as either a regex construct, `RegExp` object or a string.
 */
export type RegexElement = RegexConstruct | RegExp | string;

/**
 * Fundamental building block of a regular expression: encoded regex pattern with information about its precedence (atom, sequence, disjunction)
 */
export interface RegexConstruct {
  precedence: EncodePrecedence;
  pattern: string;
}

/**
 * Precedence of given regex pattern.
 */
export type EncodePrecedence = 'atom' | 'sequence' | 'disjunction';

/**
 * Flags to be passed to RegExp constructor.
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/RegExp#flags
 */
export interface RegexFlags {
  /**
   * Find all matches in a string, instead of just the first one.
   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/global
   */
  global?: boolean;

  /**
   * Perform case-insensitive matching.
   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/ignoreCase
   */
  ignoreCase?: boolean;

  /**
   * Treat the start and end of each line in a string as the beginning and end of the string.
   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/multiline
   */
  multiline?: boolean;

  /**
   * Generate the start and end indices of each captured group in a match.
   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/hasIndices
   */
  hasIndices?: boolean;

  /**
   * MDN: _Allows . to match newlines._
   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/dotAll
   */
  dotAll?: boolean;

  /**
   * MDN: _Matches only from the index indicated by the `lastIndex` property of this regular expression in the target string. Does not attempt to match from any later indexes._
   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/sticky
   */
  sticky?: boolean;

  /**
   * Enables [Unicode-aware mode](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/unicode#unicode-aware_mode).
   *
   * This enables features like:
   * - Unicode character escapes: `\u{xxxx}`
   * - Unicode character property escapes:`\p{Property=Value}`
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/unicode
   */
  unicode?: boolean;
}
