import { buildRegExp, endOfString, oneOrMore, repeat, startOfString } from "../index.js";

test("example: email validation", () => {
  const usernameChars = /[a-z\d._%+-]/;
  const hostnameChars = /[a-z\d.-]/;
  const domainChars = /[a-z]/;

  const regex = buildRegExp(
    [
      startOfString,
      oneOrMore(usernameChars),
      "@",
      oneOrMore(hostnameChars),
      ".",
      repeat(domainChars, { min: 2 }),
      endOfString,
    ],
    { ignoreCase: true },
  );

  expect(regex).toMatchString("aaa@gmail.co");
  expect(regex).toMatchString("aaa@gmail.com");
  expect(regex).toMatchString("Aaa@GMail.Com");
  expect(regex).toMatchString("aaa@long.domain.example.com");

  expect(regex).not.toMatchString("@");
  expect(regex).not.toMatchString("aaa@");
  expect(regex).not.toMatchString("a@gmail.c");
  expect(regex).not.toMatchString("@gmail.com");

  expect(regex).toEqualRegex(/^[a-z\d._%+-]+@[a-z\d.-]+\.[a-z]{2,}$/i);
});
