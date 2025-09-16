import type { RegexConstruct, RegexElement, RegexSequence } from "./types.js";
import { ensureElements, ensureText } from "./utils.js";

export function encode(sequence: RegexSequence): RegexConstruct {
  const elements = ensureElements(sequence);
  const encoded = elements.map((n) => encodeElement(n));

  if (encoded.length === 1) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return encoded[0]!;
  }

  return {
    precedence: "sequence",
    pattern: encoded
      .map((n) => (n.precedence === "disjunction" ? encodeAtomic(n) : n.pattern))
      .join(""),
  };
}

export function encodeAtomic(sequence: RegexSequence): string {
  const encoded = encode(sequence);
  return encoded.precedence === "atom" ? encoded.pattern : `(?:${encoded.pattern})`;
}

function encodeElement(element: RegexElement): RegexConstruct {
  if (typeof element === "string") {
    return encodeText(element);
  }

  if (element instanceof RegExp) {
    return encodeRegExp(element);
  }

  // RegexConstruct
  if (typeof element === "object" && "pattern" in element) {
    return element;
  }

  throw new Error(`Unsupported element. Received: ${JSON.stringify(element, null, 2)}`);
}

function encodeText(text: string): RegexConstruct {
  ensureText(text);

  return {
    // Optimize for single character case
    precedence: text.length === 1 ? "atom" : "sequence",
    pattern: escapeText(text),
  };
}

function encodeRegExp(regexp: RegExp): RegexConstruct {
  const pattern = regexp.source;

  return {
    // Encode at safe precedence
    precedence: isAtomicPattern(pattern) ? "atom" : "disjunction",
    pattern,
  };
}

// This is intended to catch only some popular atomic patterns like char classes and groups.
function isAtomicPattern(pattern: string): boolean {
  // Simple char, char class [...] or group (...)
  return pattern.length === 1 || /^\[[^[\]]*\]$/.test(pattern) || /^\([^()]*\)$/.test(pattern);
}

// Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions#escaping
function escapeText(text: string) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // $& means the whole matched string
}
