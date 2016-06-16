### `iife-to-ternary-expression`

Replaces Decaf generated IIFEs containing if-else statements with ternaries.

```sh
jscodeshift -t shopify-codemod/transforms/iife-to-ternary-expression <file>
```

#### Example

```js
let foo = (() => {
  if (test) {
    return bar;
  } else {
    return baz;
  }
})();

// BECOMES:

let foo = (test ? bar : baz);
```
