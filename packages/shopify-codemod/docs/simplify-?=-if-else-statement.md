### `simplify-?=-if-else-statement`

Removes useless consequent case and inverts test for Decaf `?=` generated if-else-statements.

```sh
jscodeshift -t shopify-codemod/transforms/simplify-?=-if-else-statement <file>
```

#### Example

```js
if (a != null) {
  a;
} else {
  a = b;
}

// BECOMES:

if (a === null) {
  a = b;
}
```
