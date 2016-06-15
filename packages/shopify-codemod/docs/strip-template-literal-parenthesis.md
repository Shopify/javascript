### `strip-template-literal-parenthesis`

Removes superfluous parenthesis from `decaf`-generated template strings.

#### Example

```js
const foo = (`foo ${bar}`);

// BECOMES:

const foo = `foo ${bar}`;
```

### `ternary-statement-to-if-statement`

Changes ternary statement expressions to if statements.

```sh
jscodeshift -t shopify-codemod/transforms/ternary-statement-to-if-statement <file>
```

#### Example

```js
(1 > 2 ? a() : b());

// BECOMES:

if (1 > 2) {
  a();
} else {
  b();
}
```

```js
function c() {
  return (1 > 2 ? a() : b());
}

// BECOMES:

function c() {
  if (1 > 2) {
    return a();
  } else {
    return b();
  }
}
```
