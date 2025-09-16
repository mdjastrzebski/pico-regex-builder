import "../../test-utils/index.js";

import { oneOrMore, repeat, zeroOrMore } from "../../index.js";

test("`repeat` quantifier pattern", () => {
  expect(["a", repeat("b", { min: 1, max: 5 })]).toEqualRegex(/ab{1,5}/);
  expect(["a", repeat("b", { min: 1 })]).toEqualRegex(/ab{1,}/);
  expect(["a", repeat("b", 1)]).toEqualRegex(/ab{1}/);

  expect(["a", repeat(["a", zeroOrMore("b")], 1)]).toEqualRegex(/a(?:ab*){1}/);
  expect(repeat(["text", " ", oneOrMore("d")], 5)).toEqualRegex(/(?:text d+){5}/);
});

test("`repeat` pattern optimizes grouping for atoms", () => {
  expect(repeat(/\d/, 2)).toEqualRegex(/(?:\d){2}/);
  expect(repeat(/\d/, { min: 2 })).toEqualRegex(/(?:\d){2,}/);
  expect(repeat(/\d/, { min: 1, max: 5 })).toEqualRegex(/(?:\d){1,5}/);
});

test("`repeat` throws on no children", () => {
  expect(() => repeat([], 1)).toThrowErrorMatchingInlineSnapshot(`"Expected at least one element"`);
});

test("greedy `repeat` quantifier pattern", () => {
  expect(repeat("a", { min: 1, greedy: true })).toEqualRegex(/a{1,}/);
  expect(repeat("a", { min: 1, max: 5, greedy: true })).toEqualRegex(/a{1,5}/);
});

test("non-greedy `repeat` quantifier pattern", () => {
  expect(repeat("a", { min: 1, greedy: false })).toEqualRegex(/a{1,}?/);
  expect(repeat("a", { min: 1, max: 5, greedy: false })).toEqualRegex(/a{1,5}?/);
});
