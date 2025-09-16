import "../../test-utils/matchers.js";

import { capture, negativeLookahead, oneOrMore, zeroOrMore } from "../../index.js";

test("`negativeLookahead` pattern", () => {
  expect(negativeLookahead("a")).toEqualRegex(/(?!a)/);
  expect(negativeLookahead("abc")).toEqualRegex(/(?!abc)/);
  expect(negativeLookahead(oneOrMore("abc"))).toEqualRegex(/(?!(?:abc)+)/);
  expect(oneOrMore(negativeLookahead("abc"))).toEqualRegex(/(?!abc)+/);
});

test("`negativeLookahead` matching", () => {
  expect([negativeLookahead("$"), oneOrMore(/\d/)]).toMatchString("1 turkey costs 30$");
  expect([negativeLookahead("a"), "b"]).toMatchString("abba");
  expect(["a", negativeLookahead(capture("bba"))]).not.toMatchGroups("abba", ["a", "bba"]);
  expect([negativeLookahead("-"), /[+-]/, zeroOrMore(/\d/)]).not.toMatchString("-123");
  expect([negativeLookahead("-"), /[+-]/, zeroOrMore(/\d/)]).toMatchString("+123");
});

test("`negativeLookahead` matching with multiple elements", () => {
  expect(negativeLookahead(["abc", "def"])).toEqualRegex(/(?!abcdef)/);
  expect(negativeLookahead([oneOrMore("abc"), "def"])).toEqualRegex(/(?!(?:abc)+def)/);
  expect(negativeLookahead(["abc", oneOrMore("def")])).toEqualRegex(/(?!abc(?:def)+)/);
});

test("`negativeLookahead` matching with special characters", () => {
  expect(negativeLookahead(["$", "+"])).toEqualRegex(/(?!\$\+)/);
  expect(negativeLookahead(["[", "]"])).toEqualRegex(/(?!\[\])/);
  expect(negativeLookahead(["\\", "\\"])).toEqualRegex(/(?!\\\\)/);
});

test("`negativeLookahead` matching with quantifiers", () => {
  expect(negativeLookahead(zeroOrMore("abc"))).toEqualRegex(/(?!(?:abc)*)/);
  expect(negativeLookahead(oneOrMore("abc"))).toEqualRegex(/(?!(?:abc)+)/);
  expect(negativeLookahead(["abc", zeroOrMore("def")])).toEqualRegex(/(?!abc(?:def)*)/);
});
