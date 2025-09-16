import {
  buildRegExp,
  choiceOf,
  endOfString,
  oneOrMore,
  optional,
  startOfString,
  zeroOrMore,
} from "../index.js";

// Modified from: https://stackoverflow.com/a/2015516
test("example: simple url validation", () => {
  const protocol = [choiceOf("http", "https"), "://"];
  const domainChars = /[a-z\d]/;
  const domainCharsHyphen = /[a-z\d-]/;

  const domainSegment = choiceOf(
    domainChars, // single char
    [domainChars, zeroOrMore(domainCharsHyphen), domainChars], // multi char
  );

  const regex = buildRegExp([
    startOfString,
    optional(protocol),
    oneOrMore([domainSegment, "."]), // domain segment
    /[a-z]/, // TLD first char
    oneOrMore(domainChars), // TLD remaining chars
    endOfString,
  ]);

  expect(regex).toMatchString("example.com");
  expect(regex).toMatchString("beta.example.com");
  expect(regex).toMatchString("http://beta.example.com");
  expect(regex).toMatchString("https://beta.example.com");
  expect(regex).toMatchString("a.co");

  expect(regex).not.toMatchString("example");
  expect(regex).not.toMatchString("aaa.a");
  expect(regex).not.toMatchString("a.-a.com");
  expect(regex).not.toMatchString("a.-a.com");
  expect(regex).not.toMatchString("@gmail.com");

  expect(regex).toEqualRegex(
    /^(?:(?:http|https):\/\/)?(?:(?:[a-z\d]|[a-z\d][a-z\d-]*[a-z\d])\.)+[a-z][a-z\d]+$/,
  );
});
