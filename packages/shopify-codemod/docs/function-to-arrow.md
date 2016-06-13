### `function-to-arrow`

Changes function expressions to arrow functions, where possible.

```sh
jscodeshift -t shopify-codemod/transforms/function-to-arrow <file>
```

#### Example

```js
a(function() {
  b(function() { return 1; });
});

// BECOMES:

a(() => {
  b(() => 1);
});
```
