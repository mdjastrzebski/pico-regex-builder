import { lookbehind } from "../index.js";
import { buildRegExp, endOfString, optional, zeroOrMore } from "../index.js";

const decimalSeparator = ".";

const firstThousandsClause = /\d{1,3}/;
const thousandsSeparator = ",";
const thousands = /\d{3}/;
const thousandsClause = [optional(thousandsSeparator), thousands];
const cents = /\d{2}/;
const isCurrency = lookbehind(/[$€£¥R₿]/);

test("example: extracting currency values", () => {
  const currencyRegex = buildRegExp([
    isCurrency,
    /\s?/,
    firstThousandsClause,
    zeroOrMore(thousandsClause),
    optional([decimalSeparator, cents]),
    endOfString,
  ]);

  expect(currencyRegex).toMatchString("$10");
  expect(currencyRegex).toMatchString("$ 10");
  expect(currencyRegex).not.toMatchString("$ 10.");
  expect(currencyRegex).toMatchString("$ 10");
  expect(currencyRegex).not.toMatchString("$10.5");
  expect(currencyRegex).toMatchString("$10.50");
  expect(currencyRegex).not.toMatchString("$10.501");
  expect(currencyRegex).toMatchString("€100");
  expect(currencyRegex).toMatchString("£1,000");
  expect(currencyRegex).toMatchString("$ 100000000000000000");
  expect(currencyRegex).toMatchString("€ 10000");
  expect(currencyRegex).toMatchString("₿ 100,000");
  expect(currencyRegex).not.toMatchString("10$");
  expect(currencyRegex).not.toMatchString("£A000");

  expect(currencyRegex).toEqualRegex(
    /(?<=[$€£¥R₿])(?:\s?)(?:\d{1,3})(?:,?(?:\d{3}))*(?:\.(?:\d{2}))?$/,
  );
});
