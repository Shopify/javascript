### `existential-assignment-to-if-statement`

Removes useless consequent case and inverts test for Decaf `?=` generated if-else-statements.

```sh
jscodeshift -t shopify-codemod/transforms/existential-assignment-to-if-statement <file>
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
