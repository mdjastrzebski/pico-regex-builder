import "../../test-utils/matchers.js";

import { buildRegExp, oneOrMore, optional, zeroOrMore } from "../../index.js";

test("`oneOrMore` quantifier pattern", () => {
  expect(oneOrMore("a")).toEqualRegex(/a+/);
  expect(oneOrMore("ab")).toEqualRegex(/(?:ab)+/);
});

test("`optional` quantifier pattern", () => {
  expect(optional("a")).toEqualRegex(/a?/);
  expect(optional("ab")).toEqualRegex(/(?:ab)?/);
});

test("`zeroOrMore` quantifier pattern", () => {
  expect(zeroOrMore("a")).toEqualRegex(/a*/);
  expect(zeroOrMore("ab")).toEqualRegex(/(?:ab)*/);
});

test("`oneOrMore` matching does not generate capture when grouping", () => {
  expect(oneOrMore("aa")).toMatchGroups("aa", ["aa"]);
});

test("`optional` matching does not generate capture when grouping", () => {
  expect(optional("aa")).toMatchGroups("aa", ["aa"]);
});

test("`zeroOrMore` matching does not generate capture when grouping", () => {
  expect(zeroOrMore("aa")).toMatchGroups("aa", ["aa"]);
});

test("base quantifiers support atoms", () => {
  expect(oneOrMore(/\d/)).toEqualRegex(/(?:\d)+/);
  expect(optional(/\d/)).toEqualRegex(/(?:\d)?/);
  expect(zeroOrMore(/\d/)).toEqualRegex(/(?:\d)*/);

  expect(oneOrMore("a")).toEqualRegex(/a+/);
  expect(optional("a")).toEqualRegex(/a?/);
  expect(zeroOrMore("a")).toEqualRegex(/a*/);
});

test("greedy quantifiers patterns", () => {
  expect(oneOrMore("a", { greedy: true })).toEqualRegex(/a+/);
  expect(oneOrMore("ab", { greedy: true })).toEqualRegex(/(?:ab)+/);

  expect(optional("a", { greedy: true })).toEqualRegex(/a?/);
  expect(optional("ab", { greedy: true })).toEqualRegex(/(?:ab)?/);

  expect(zeroOrMore("a", { greedy: true })).toEqualRegex(/a*/);
  expect(zeroOrMore("ab", { greedy: true })).toEqualRegex(/(?:ab)*/);
});

test("non-greedy quantifiers patterns", () => {
  expect(oneOrMore("a", { greedy: false })).toEqualRegex(/a+?/);
  expect(oneOrMore("ab", { greedy: false })).toEqualRegex(/(?:ab)+?/);

  expect(optional("a", { greedy: false })).toEqualRegex(/a??/);
  expect(optional("ab", { greedy: false })).toEqualRegex(/(?:ab)??/);

  expect(zeroOrMore("a", { greedy: false })).toEqualRegex(/a*?/);
  expect(zeroOrMore("ab", { greedy: false })).toEqualRegex(/(?:ab)*?/);
});

test("greedy quantifiers matching", () => {
  const html = "<div>Hello <em>World!</em></div>";

  const greedyTag = buildRegExp(["<", oneOrMore(/./), ">"], { global: true });
  expect(greedyTag).toMatchGroups(html, ["<div>Hello <em>World!</em></div>"]);
});

test("non-greedy quantifiers matching", () => {
  const html = "<div>Hello <em>World!</em></div>";

  const nonGreedyTag = buildRegExp(["<", oneOrMore(/./, { greedy: false }), ">"], { global: true });
  expect(nonGreedyTag).toMatchGroups(html, ["<div>", "<em>", "</em>", "</div>"]);
});
