import {
  buildRegExp,
  capture,
  endOfString,
  negativeLookahead,
  oneOrMore,
  optional,
  repeat,
  startOfString,
} from "../index.js";

//  URL = Scheme ":"["//" Authority]Path["?" Query]["#" Fragment]
//  Source: https://en.wikipedia.org/wiki/URL#External_links

// The building blocks of the URL regex.
const portSeperator = ":";
const schemeSeperator = ":";
const doubleSlash = "//";
const at = "@";
const pathSeparator = "/";
const querySeparator = "?";
const fragmentSeparator = "#";
const usernameChars = /[a-z\d._%+-]/;
const hostnameChars = /[a-z\d-]/;
const domainChars = /[a-z]/;

// Scheme:
//      The scheme is the first part of the URL and defines the protocol to be used.
//      Examples of popular schemes include http, https, ftp, mailto, file, data and irc.
//      A URL string must be a scheme, followed by a colon, followed by a scheme-specific part.

const scheme = [repeat(/[a-z-]/, { min: 3, max: 6 })];
const schemeRegex = buildRegExp([startOfString, capture(scheme), endOfString], {
  ignoreCase: true,
});

test("Matching the Schema components.", () => {
  expect(schemeRegex).toMatchString("ftp");
  expect(schemeRegex).not.toMatchString("ftp:");
  expect(schemeRegex).not.toMatchString("h");
  expect(schemeRegex).not.toMatchString("nameiswaytoolong");
  expect(schemeRegex).toMatchString("HTTPS");
  expect(schemeRegex).toMatchString("http");
});

// Authority:
//      The authority part of a URL consists of three sub-parts:
//      1. An optional username, followed by an at symbol (@)
//      2. A hostname (e.g. www.google.com)
//      3. An optional port number, preceded by a colon (:)
// Authority = [userinfo "@"] host [":" port]

const userInfo = oneOrMore(usernameChars);
const hostname = repeat(hostnameChars, { min: 1, max: 63 });
const hostnameEnd = capture([hostname, endOfString]);
const host = capture([oneOrMore([hostname, "."])]);
const port = [portSeperator, /\d+/];

const authority = [doubleSlash, optional([userInfo, at]), hostname, optional(port)];
const authorityRegex = buildRegExp([startOfString, ...authority, endOfString], {
  ignoreCase: true,
});

const hostEx = buildRegExp([startOfString, host, hostnameEnd, endOfString], { ignoreCase: true });

test("match URL hostname component", () => {
  expect(hostEx).toMatchString("www.google.com");
  expect(hostEx).not.toMatchString("www.google.com.");
});

test("match URL authority components", () => {
  expect(authorityRegex).toMatchString("//davidbowie@localhost:8080");
  expect(authorityRegex).toMatchString("//localhost:1234");
  expect(authorityRegex).not.toMatchString("davidbowie@localhost:1972");
  expect(authorityRegex).not.toMatchString("nameiswaytoolong");
});

// Path:
//      The path is the part of the URL that comes after the authority and before the query.
//      It consists of a sequence of path segments separated by a forward slash (/).
//      A path string must begin with a forward slash (/).

const pathSegment = [pathSeparator, optional(oneOrMore(/[a-zA-Z0-9:@%._+~#=]/))];

const path = oneOrMore(pathSegment);
const pathRegex = buildRegExp([startOfString, path, endOfString], {
  ignoreCase: true,
});

test("match URL Path components.", () => {
  expect(pathRegex).toMatchString("/");
  expect(pathRegex).not.toMatchString("");
  expect(pathRegex).toMatchString("/a");
  expect(pathRegex).not.toMatchString("a");
  expect(pathRegex).not.toMatchString("a/");
  expect(pathRegex).toMatchString("/a/b");
  expect(pathRegex).not.toMatchString("a/b");
  expect(pathRegex).not.toMatchString("a/b/");
});

// Query:
//      The query part of a URL is optional and comes after the path.
//      It is separated from the path by a question mark (?).
//      The query string consists of a sequence of field-value pairs separated by an ampersand (&).
//      Each field-value pair is separated by an equals sign (=).

const queryKey = oneOrMore(/[a-zA-Z0-9_-]/);
const queryValue = oneOrMore(/[a-zA-Z0-9_-]/);
const queryDelimiter = /[&;]/;
const equals = "=";

const queryKeyValuePair = buildRegExp([queryKey, equals, queryValue]);

const query = [querySeparator, oneOrMore([queryKeyValuePair, optional(queryDelimiter)])];
const queryRegex = buildRegExp([startOfString, ...query, endOfString], {
  ignoreCase: true,
});

test("match URL query components", () => {
  expect(queryRegex).not.toMatchString("");
  expect(queryRegex).not.toMatchString("??");
  expect(queryRegex).not.toMatchString("?");
  expect(queryRegex).not.toMatchString("?a-b");
  expect(queryRegex).toMatchString("?a=b");
  expect(queryRegex).toMatchString("?a=b&c=d");
  expect(queryRegex).not.toMatchString("a=b&c-d");
});

// Fragment:
//      The fragment part of a URL is optional and comes after the query.
//      It is separated from the query by a hash (#).
//      The fragment string consists of a sequence of characters.

const fragment = [fragmentSeparator, oneOrMore(/[a-zA-Z0-9:@%._+~#=&]/)];
const fragmentRegex = buildRegExp([startOfString, ...fragment, endOfString], {
  ignoreCase: true,
});

test("match URL fragment component", () => {
  expect(fragmentRegex).not.toMatchString("");
  expect(fragmentRegex).toMatchString("#section1");
  expect(fragmentRegex).not.toMatchString("#");
});

const urlRegex = buildRegExp(
  [
    startOfString,
    capture([
      optional(scheme),
      schemeSeperator,
      optional(authority),
      path,
      optional(query),
      optional(fragment),
    ]),
    endOfString,
  ],
  {
    ignoreCase: true,
  }
);

test("match URLs", () => {
  expect(urlRegex).not.toMatchString("");
  expect(urlRegex).not.toMatchString("http");
  expect(urlRegex).toMatchString("http://localhost:8080");
  expect(urlRegex).toMatchString("http://localhost:8080/users/paul/research/data.json");
  expect(urlRegex).toMatchString(
    "http://localhost:8080/users/paul/research/data.json?request=regex&email=me"
  );
  expect(urlRegex).toMatchString(
    "http://localhost:8080/users/paul/research/data.json?request=regex&email=me#section1"
  );
});

const emailRegex = buildRegExp(
  [
    startOfString,
    capture([
      oneOrMore(usernameChars),
      "@",
      oneOrMore(hostnameChars),
      ".",
      repeat(domainChars, { min: 2 }),
    ]),
    endOfString,
  ],
  {
    ignoreCase: true,
  }
);

test("match email address", () => {
  expect(emailRegex).not.toMatchString("");
  expect(emailRegex).toMatchString("stevenwilson@porcupinetree.com");
  expect(emailRegex).not.toMatchString("stevenwilson@porcupinetree");
});

const urlsWithoutEmailsRegex = buildRegExp(
  [
    startOfString,
    negativeLookahead(emailRegex), // Reject emails
    urlRegex,
    endOfString,
  ],
  {
    ignoreCase: true,
  }
);

test("match URL but not email", () => {
  expect(urlsWithoutEmailsRegex).toMatchString("http://localhost:8080");
  expect(urlsWithoutEmailsRegex).toMatchString(
    "http://paul@localhost:8080/users/paul/research/data.json?request=regex&email=me#section1"
  );
  expect(urlsWithoutEmailsRegex).toMatchString("ftp://data/#January");
  expect(urlsWithoutEmailsRegex).not.toMatchString("https:");
  expect(urlsWithoutEmailsRegex).not.toMatchString("piotr@riverside.com");
  expect(urlsWithoutEmailsRegex).toMatchString("http://www.google.com");
  expect(urlsWithoutEmailsRegex).toMatchString("https://www.google.com?search=regex");
  expect(urlsWithoutEmailsRegex).not.toMatchString("www.google.com?search=regex&email=me");
  expect(urlsWithoutEmailsRegex).toMatchString("mailto://paul@thebeatles.com");
  expect(urlsWithoutEmailsRegex).not.toMatchString("ftphttpmailto://neal@nealmorse");
});
