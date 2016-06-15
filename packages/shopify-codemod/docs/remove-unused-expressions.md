### `remove-unused-expressions`

Removes any expressions that don't have any possible side effects.

```sh
jscodeshift -t shopify-codemods/transforms/remove-unused-expressions <file>
```

#### Example

```js
foo;
!foo;
123;
foo.bar;

function foo() {};
const foo = bar;
foo.bar();
delete foo.bar;

// BECOMES:

function foo() {};
const foo = bar;
foo.bar();
delete foo.bar;
```
