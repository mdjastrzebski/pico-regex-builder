import "../../test-utils/matchers.js";

import { capture, lookahead, oneOrMore, zeroOrMore } from "../../index.js";

test("`lookahead` pattern", () => {
  expect(lookahead("a")).toEqualRegex(/(?=a)/);
  expect([/\d/, lookahead("abc")]).toEqualRegex(/(?:\d)(?=abc)/);
  expect(lookahead(oneOrMore("abc"))).toEqualRegex(/(?=(?:abc)+)/);
  expect([zeroOrMore(/\w/), lookahead("abc")]).toEqualRegex(/(?:\w)*(?=abc)/);
});

test("`lookahead` matching", () => {
  expect([oneOrMore(/\d/), lookahead("$")]).toMatchString("1 turkey costs 30$");
  expect(["q", lookahead("u")]).toMatchString("queen");
  expect(["a", lookahead("b"), lookahead("c")]).not.toMatchString("abc");
  expect(["a", lookahead(capture("bba"))]).toMatchGroups("abba", ["a", "bba"]);
});

test("`lookahead` matching with multiple elements", () => {
  expect(lookahead(["a", "b", "c"])).toEqualRegex(/(?=abc)/);
});

test("`lookahead` matching with nested constructs", () => {
  expect(lookahead(oneOrMore(capture("abc")))).toEqualRegex(/(?=(abc)+)/);
  expect(lookahead([zeroOrMore(/\w/), capture("abc")])).toEqualRegex(/(?=(?:\w)*(abc))/);
});

test("`lookahead` matching with special characters", () => {
  expect(lookahead(["$", capture("abc")])).toEqualRegex(/(?=\$(abc))/);
  expect(lookahead(["q", capture("u")])).toEqualRegex(/(?=q(u))/);
});

test("`lookahead` matching with capture group", () => {
  expect(lookahead(capture("bba"))).toEqualRegex(/(?=(bba))/);
});

test("`lookahead` matching with digit character class", () => {
  expect(lookahead([/\d/, "abc"])).toEqualRegex(/(?=(?:\d)abc)/);
});
