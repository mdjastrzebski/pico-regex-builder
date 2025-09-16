---
id: captures
title: Captures
---

### `capture()`

```ts
function capture(
  sequence: RegexSequence,
  options?: {
    name?: string;
  },
): RegexConstruct;
```

Regex syntax:

- `(...)` for capturing groups (no `name` option)
- `(?<name>...)` for named capturing groups (`name` option)

Captures, also known as capturing groups, extract and store parts of the matched string for later use.

Capture results are available using array-like [`match()` result object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/match#using_match).

#### Named groups

When using `name` options, the group becomes a [named capturing group](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Named_capturing_group) allowing to refer to it using name instead of index.

Named capture results are available using [`groups`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/match#using_named_capturing_groups) property on `match()` result.

:::note

TS Regex Builder does not have a construct for non-capturing groups. Such groups are implicitly added when required. E.g., `zeroOrMore("abc")` is encoded as `(?:abc)+`.

:::

### `ref()`

```ts
function ref(name: string): RegexConstruct;
```

Regex syntax: `\k<...>`.

Creates a reference, also known as a backreference, which allows matching again the exact text that a capturing group previously matched. The reference must use the same name as some capturing group earlier in the expression to form a valid regex.

Usage with `capture()`:

```ts
const regex = buildRegExp([
  // Create a named capture using name from `someKey`.
  capture(..., { name: 'someKey' }),
  // ... some other elements ...

  // Match the same text as matched by `capture` with the same name.
  ref('someKey'),
  ])
```

:::note

TS Regex Builder doesn't support using ordinal backreferences (`\1`, `\2`, etc) because in complex regex patterns, these references are difficult to accurately use.

:::
