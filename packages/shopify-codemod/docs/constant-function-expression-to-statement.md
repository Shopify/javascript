### `constant-function-expression-to-statement`

Changes constant function expression declarations to a statement.

```sh
jscodeshift -t shopify-codemod/transforms/constant-function-expression-to-statement <file>
```

#### Example

```js
const a = function() {
  return 1;
};

// BECOMES:

function a() {
  return 1;
}
```
