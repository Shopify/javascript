### `split-if-assignments`

Moves assignments within an `if`'s condition to before the `if`.

See eslint's [`no-cond-assign`](http://eslint.org/docs/rules/no-cond-assign) rule for more details.

```sh
jscodeshift -t shopify-codemod/transforms/split-if-assignments <file>
```

#### Example

```js
if (foo = 'bar') {
  qux();
}

if (foo = bar()) {
  qux();
}

// BECOMES:

foo = 'bar';
if (foo) {
  qux();
}

foo = bar();
if (foo) {
  qux();
}
```
