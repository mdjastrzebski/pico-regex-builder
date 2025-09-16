import { buildRegExp, choiceOf, endOfString, optional, regex, startOfString } from "../index.js";

test("example: validate JavaScript number", () => {
  const sign = /[+-]/;
  const exponent = regex([/[eE]/, optional(sign), /\d+/]);

  const numberValidator = buildRegExp([
    startOfString,
    optional(sign),
    choiceOf(
      [/\d+/, optional([".", /\d*/])], // leading digit
      [".", /\d+/], // leading dot
    ),
    optional(exponent), // exponent
    endOfString,
  ]);

  expect(numberValidator).toMatchString("0");
  expect(numberValidator).toMatchString("-1");
  expect(numberValidator).toMatchString("+1");
  expect(numberValidator).toMatchString("1.0");
  expect(numberValidator).toMatchString("1.1234");
  expect(numberValidator).toMatchString("1.");
  expect(numberValidator).toMatchString(".1");
  expect(numberValidator).toMatchString("-.1234");
  expect(numberValidator).toMatchString("+.5");
  expect(numberValidator).toMatchString("1e21");
  expect(numberValidator).toMatchString("1e-21");
  expect(numberValidator).toMatchString("+1e+42");
  expect(numberValidator).toMatchString("-1e-42");

  expect(numberValidator).not.toMatchString("");
  expect(numberValidator).not.toMatchString("a");
  expect(numberValidator).not.toMatchString("1a");
  expect(numberValidator).not.toMatchString("1.0.");
  expect(numberValidator).not.toMatchString(".1.1");
  expect(numberValidator).not.toMatchString(".");

  expect(numberValidator).toEqualRegex(
    /^[+-]?(?:(?:\d+)(?:\.(?:\d*))?|\.(?:\d+))(?:[eE][+-]?(?:\d+))?$/,
  );
});
