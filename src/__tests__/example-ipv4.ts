import { buildRegExp, choiceOf, endOfString, repeat, startOfString } from "../index.js";

test("example: IPv4 address validator", () => {
  const octet = choiceOf(/[0-9]/, /[1-9][0-9]/, /1[0-9][0-9]/, /2[0-4][0-9]/, /25[0-5]/);

  const regex = buildRegExp([
    startOfString, // prettier break-line
    repeat([octet, "."], 3),
    octet,
    endOfString,
  ]);

  expect(regex).toMatchString("0.0.0.0");
  expect(regex).toMatchString("192.168.0.1");
  expect(regex).toMatchString("1.99.100.249");
  expect(regex).toMatchString("255.255.255.255");
  expect(regex).toMatchString("123.45.67.89");

  expect(regex).not.toMatchString("0.0.0.");
  expect(regex).not.toMatchString("0.0.0.0.");
  expect(regex).not.toMatchString("0.-1.0.0");
  expect(regex).not.toMatchString("0.1000.0.0");
  expect(regex).not.toMatchString("0.0.300.0");
  expect(regex).not.toMatchString("255.255.255.256");

  expect(regex).toEqualRegex(
    /^(?:(?:[0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\.){3}(?:[0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])$/
  );
});
