import "../../test-utils/matchers.js";

import { lookbehind, oneOrMore, zeroOrMore } from "../../index.js";

test("`lookbehind` pattern", () => {
  expect(lookbehind("a")).toEqualRegex(/(?<=a)/);
  expect(lookbehind("abc")).toEqualRegex(/(?<=abc)/);
  expect(lookbehind(oneOrMore("abc"))).toEqualRegex(/(?<=(?:abc)+)/);
  expect(lookbehind("abc")).toEqualRegex(/(?<=abc)/);
});

test("`lookbehind` matching", () => {
  expect([zeroOrMore(/\s/), /\w/, lookbehind("s"), oneOrMore(/\s/)]).toMatchString(
    "too many cats to feed.",
  );

  expect([lookbehind("USD"), zeroOrMore(/\s/), oneOrMore(/\d/)]).toMatchString(
    "The price is USD 30",
  );

  expect([lookbehind("USD"), zeroOrMore(/\s/), oneOrMore(/\d/)]).not.toMatchString(
    "The price is CDN 30",
  );

  expect([lookbehind("a"), "b"]).toMatchString("abba");

  const mjsImport = [lookbehind(".mjs")];
  expect(mjsImport).toMatchString("import {Person} from './person.mjs';");
  expect(mjsImport).not.toMatchString("import {Person} from './person.js';");
  expect([/[+-]/, oneOrMore(/\d/), lookbehind("-")]).not.toMatchString("+123");
});

test("`lookbehind` matching with multiple elements", () => {
  expect(lookbehind(["abc", "def"])).toEqualRegex(/(?<=abcdef)/);
  expect(lookbehind([oneOrMore("abc"), "def"])).toEqualRegex(/(?<=(?:abc)+def)/);
  expect(lookbehind(["abc", oneOrMore("def")])).toEqualRegex(/(?<=abc(?:def)+)/);
});

test("`lookbehind` matching with special characters", () => {
  expect(lookbehind(["$", "+"])).toEqualRegex(/(?<=\$\+)/);
  expect(lookbehind(["[", "]"])).toEqualRegex(/(?<=\[\])/);
  expect(lookbehind(["\\", "\\"])).toEqualRegex(/(?<=\\\\)/);
});

test("`lookbehind` matching with quantifiers", () => {
  expect(lookbehind(zeroOrMore("abc"))).toEqualRegex(/(?<=(?:abc)*)/);
  expect(lookbehind(oneOrMore("abc"))).toEqualRegex(/(?<=(?:abc)+)/);
  expect(lookbehind(["abc", zeroOrMore("def")])).toEqualRegex(/(?<=abc(?:def)*)/);
});

test("`lookbehind` matching with character classes", () => {
  expect(lookbehind(/\w/)).toEqualRegex(/(?<=\w)/);
  expect(lookbehind(/\s/)).toEqualRegex(/(?<=\s)/);
  expect(lookbehind(/\d/)).toEqualRegex(/(?<=\d)/);
  expect(lookbehind(/[abc]/)).toEqualRegex(/(?<=[abc])/);
});
