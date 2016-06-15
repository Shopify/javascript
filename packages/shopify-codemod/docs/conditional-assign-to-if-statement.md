### `conditional-assign-to-if-statement`

Changes conditional assignment of default values to if statements (see [`no-unused-expressions`.](http://eslint.org/docs/rules/no-unused-expressions))

```sh
jscodeshift -t shopify-codemod/transforms/conditional-assign-to-if-statement <file>
```

#### Example

```js
foo || (foo = 'bar');

// BECOMES:

if (!foo) {
  foo = 'bar';
}
```
