[![npm version](https://badge.fury.io/js/pico-regex-builder.svg)](https://badge.fury.io/js/pico-regex-builder)
![Build](https://github.com/mdjastrzebski/pico-regex-builder/actions/workflows/ci.yml/badge.svg)
![npm bundle size](https://deno.bundlejs.com/badge?q=pico-regex-builder)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)
[![Star on GitHub](https://img.shields.io/github/stars/mdjastrzebski/pico-regex-builder.svg?style=social)](https://github.com/mdjastrzebski/pico-regex-builder/stargazers)

# Pico Regex Builder

The smallest and fastest builder for maintainable regular expression.

[API docs](https://mdjastrzebski.github.io/pico-regex-builder/api) | [Examples](https://mdjastrzebski.github.io/pico-regex-builder/examples)

**Note**
Note: this library is a slimmed down version of [TS Regex Builder](https://github.com/callstack/ts-regex-builder/). It removes some verbose features like character classes and escapes, and keeps just the core features to build complex yet maintainable regexes.

For fully fledge regex builder library use [TS Regex Builder](https://github.com/callstack/ts-regex-builder/).

## Goal

Regular expressions are a powerful tool for matching text patterns, yet they are notorious for their hard-to-parse syntax, especially in the case of more complex patterns.

This library allows users to create regular expressions in a structured way, making them easy to write and review. It provides a domain-specific langauge for defining regular expressions, which are finally turned into JavaScript-native `RegExp` objects for fast execution.

```ts
// Regular JS RegExp
const hexColor = /^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/;

// TS Regex Builder DSL
const hexDigit = /[a-fA-F0-9]/;

const hexColor = buildRegExp([
  startOfString,
  optional("#"),
  capture(
    choiceOf(
      repeat(hexDigit, 6), // #rrggbb
      repeat(hexDigit, 3), // #rgb
    ),
  ),
  endOfString,
]);
```

## Installation

```sh
npm install pico-regex-builder
```

or

```sh
yarn add pico-regex-builder
```

or

```sh
pnpm add pico-regex-builder
```

## Basic usage

```js
import * as r from "pico-regex-builder";

// /Hello (\w+)/
const regex = r.buildRegExp(["Hello ", r.capture(/\w+/)]);
```

## Regex domain-specific language

TS Regex Builder allows you to build complex regular expressions using domain-specific language.

Terminology:

- regex construct (`RegexConstruct`) - common name for all regex constructs like character classes, quantifiers, and anchors.
- regex element (`RegexElement`) - a fundamental building block of a regular expression, defined as either a regex construct, a string, or `RegExp` literal (`/.../`).
- regex sequence (`RegexSequence`) - a sequence of regex elements forming a regular expression. For developer convenience, it also accepts a single element instead of an array.

Most of the regex constructs accept a regex sequence as their argument.

Examples of sequences:

- single element (construct): `capture('Hello')`
- single element (string): `'Hello'`
- single element (`RegExp` literal): `/Hello/`
- array of elements: `['USD', /\d+/, /Hello/]`

Regex constructs can be composed into a tree structure:

```ts
const currencyCode = repeat(/[A-Z]/, 3);
const currencyAmount = buildRegExp([
  choiceOf("$", "€", currencyCode), // currency
  capture(
    /\d+/, // integer part
    optional([".", repeat(/\d/, 2)]), // fractional part
  ),
]);
```

See [Types API doc](https://mdjastrzebski.github.io/pico-regex-builder/api/types) for more info.

### Regex Builders

| Builder                                  | Regex Syntax | Description                         |
| ---------------------------------------- | ------------ | ----------------------------------- |
| `buildRegExp(...)`                       | `/.../`      | Create `RegExp` instance            |
| `buildRegExp(..., { ignoreCase: true })` | `/.../i`     | Create `RegExp` instance with flags |

See [Builder API doc](https://mdjastrzebski.github.io/pico-regex-builder/api/builder) for more info.

### Regex Constructs

| Construct           | Regex Syntax | Notes                           |
| ------------------- | ------------ | ------------------------------- |
| `choiceOf(x, y, z)` | `x\|y\|z`    | Match one of provided sequences |
| `capture(...)`      | `(...)`      | Create a capture group          |

See [Constructs API doc](https://mdjastrzebski.github.io/pico-regex-builder/api/constructs) for more info.

> [!NOTE]
> TS Regex Builder does not have a construct for non-capturing groups. Such groups are implicitly added when required.

### Quantifiers

| Quantifier                       | Regex Syntax | Description                                       |
| -------------------------------- | ------------ | ------------------------------------------------- |
| `zeroOrMore(x)`                  | `x*`         | Zero or more occurrence of a pattern              |
| `oneOrMore(x)`                   | `x+`         | One or more occurrence of a pattern               |
| `optional(x)`                    | `x?`         | Zero or one occurrence of a pattern               |
| `repeat(x, n)`                   | `x{n}`       | Pattern repeats exact number of times             |
| `repeat(x, { min: n, })`         | `x{n,}`      | Pattern repeats at least given number of times    |
| `repeat(x, { min: n, max: n2 })` | `x{n1,n2}`   | Pattern repeats between n1 and n2 number of times |

See [Quantifiers API doc](https://mdjastrzebski.github.io/pico-regex-builder/api/quantifiers) for more info.

### Assertions

| Assertion                 | Regex Syntax | Description                                                              |
| ------------------------- | ------------ | ------------------------------------------------------------------------ |
| `startOfString`           | `^`          | Match the start of the string (or the start of a line in multiline mode) |
| `endOfString`             | `$`          | Match the end of the string (or the end of a line in multiline mode)     |
| `wordBoundary`            | `\b`         | Match the start or end of a word without consuming characters            |
| `lookahead(...)`          | `(?=...)`    | Match subsequent text without consuming it                               |
| `negativeLookahead(...)`  | `(?!...)`    | Reject subsequent text without consuming it                              |
| `lookbehind(...)`         | `(?<=...)`   | Match preceding text without consuming it                                |
| `negativeLookbehind(...)` | `(?<!...)`   | Reject preceding text without consuming it                               |

See [Assertions API doc](https://mdjastrzebski.github.io/pico-regex-builder/api/assertions) for more info.

## Examples

See [Examples](https://mdjastrzebski.github.io/pico-regex-builder/examples).

## Performance

Regular expressions created with this library are executed at runtime, so you should avoid creating them in a context where they would need to be executed multiple times, e.g., inside loops or functions. We recommend that you create a top-level object for each required regex.

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.
See the [project guidelines](GUIDELINES.md) to understand our core principles.

## License

MIT

## Inspiration

TS Regex Builder is inspired by [Swift Regex Builder API](https://developer.apple.com/documentation/regexbuilder).

## Reference

- [ECMAScript Regular Expression BNF Grammar](https://tc39.es/ecma262/#sec-regular-expressions)
- [Unicode Regular Expressions](https://www.unicode.org/reports/tr18/)
- [Swift Evolution 351: Regex Builder DSL](https://github.com/apple/swift-evolution/blob/main/proposals/0351-regex-builder.md)
- [Swift Regex Builder API docs](https://developer.apple.com/documentation/regexbuilder)
- [TS Regex Builder](https://github.com/callstack/ts-regex-builder/)

---

Made with [create-react-native-library](https://github.com/mdjastrzebski/react-native-builder-bob)
