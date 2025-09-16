import { buildRegExp, choiceOf, nonWordBoundary, wordBoundary } from "../index.js";

test("example: find words with suffix", () => {
  const suffixesToFind = ["acy", "ism"];

  const regex = buildRegExp([
    nonWordBoundary, // match suffixes only
    choiceOf(...suffixesToFind),
    wordBoundary,
  ]);

  expect(regex).toMatchString("democracy");
  expect(regex).toMatchString("Bureaucracy");
  expect(regex).toMatchString("abc privacy ");
  expect(regex).toMatchString("abc dynamism");
  expect(regex).toMatchString("realism abc");
  expect(regex).toMatchString("abc modernism abc");

  expect(regex).not.toMatchString("abc acy");
  expect(regex).not.toMatchString("ism abc");
  expect(regex).not.toMatchString("dynamisms");

  expect(regex).toEqualRegex(/\B(?:acy|ism)\b/);
});
