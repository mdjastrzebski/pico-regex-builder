import { buildRegExp, choiceOf, endOfString, optional, repeat, startOfString } from "../index.js";

test("example: hex color validation", () => {
  const hexDigit = /[0-9a-f]/i;

  const regex = buildRegExp(
    [
      startOfString,
      optional("#"),
      choiceOf(
        repeat(hexDigit, 6), // #rrggbb
        repeat(hexDigit, 3) // #rgb
      ),
      endOfString,
    ],
    { ignoreCase: true }
  );

  expect(regex).toMatchString("#ffffff");
  expect(regex).toMatchString("ffffff");
  expect(regex).toMatchString("#eee");
  expect(regex).toMatchString("bbb");
  expect(regex).toMatchString("#000");
  expect(regex).toMatchString("#123456");
  expect(regex).toMatchString("123456");
  expect(regex).toMatchString("#123");
  expect(regex).toMatchString("123");

  expect(regex).not.toMatchString("#1");
  expect(regex).not.toMatchString("#12");
  expect(regex).not.toMatchString("#1234");
  expect(regex).not.toMatchString("#12345");
  expect(regex).not.toMatchString("#1234567");

  expect(regex).toEqualRegex(/^#?(?:[0-9a-f]{6}|[0-9a-f]{3})$/i);
});
