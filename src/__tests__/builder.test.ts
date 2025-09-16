import { buildRegExp } from "../index.js";

test("`regexBuilder` flags", () => {
  expect(buildRegExp("a").flags).toBe("");
  expect(buildRegExp("a", {}).flags).toBe("");

  expect(buildRegExp("a", { global: true }).flags).toBe("g");
  expect(buildRegExp("a", { global: false }).flags).toBe("");

  expect(buildRegExp("a", { ignoreCase: true }).flags).toBe("i");
  expect(buildRegExp("a", { ignoreCase: false }).flags).toBe("");

  expect(buildRegExp("a", { multiline: true }).flags).toBe("m");
  expect(buildRegExp("a", { multiline: false }).flags).toBe("");

  expect(buildRegExp("a", { hasIndices: true }).flags).toBe("d");
  expect(buildRegExp("a", { hasIndices: false }).flags).toBe("");

  expect(buildRegExp("a", { dotAll: true }).flags).toBe("s");
  expect(buildRegExp("a", { dotAll: false }).flags).toBe("");

  expect(buildRegExp("a", { sticky: true }).flags).toBe("y");
  expect(buildRegExp("a", { sticky: false }).flags).toBe("");

  expect(
    buildRegExp("a", {
      global: true, //
      ignoreCase: true,
      multiline: false,
      dotAll: true,
      sticky: true,
    }).flags
  ).toBe("gisy");
});

test("`regexBuilder` throws when using unicode-aware features without `unicode` flag", () => {
  expect(() => buildRegExp(/\u1234/u)).not.toThrow();
  expect(() => buildRegExp(/\u{12345}/u, { unicode: true })).not.toThrow();
  expect(() => buildRegExp(/\p{Emoji_Presentation}/u, { unicode: true })).not.toThrow();

  expect(() => buildRegExp(/\u{12345}/u)).toThrowErrorMatchingInlineSnapshot(
    `"Pattern "\\u{12345}" requires "unicode" flag to be set."`
  );
  expect(() => buildRegExp(/\p{Emoji_Presentation}/u)).toThrowErrorMatchingInlineSnapshot(
    `"Pattern "\\p{Emoji_Presentation}" requires "unicode" flag to be set."`
  );
  expect(() => buildRegExp(/\P{Letter}/u)).toThrowErrorMatchingInlineSnapshot(
    `"Pattern "\\P{Letter}" requires "unicode" flag to be set."`
  );
});

test("`regexBuilder` does not throws on tricky unicode mode-like patterns", () => {
  expect(() => buildRegExp(/\\u{1234}/)).not.toThrow();
});
