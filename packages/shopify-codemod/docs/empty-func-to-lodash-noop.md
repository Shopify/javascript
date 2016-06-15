### `empty-func-to-lodash-noop`

Transforms empty function expressions (including arrow functions) to use Lodash’s `noop` function in order to avoid linter warnings for empty function bodies. Note that function declarations are not transformed in order to avoid potential issues stemming from the way those declarations are hoisted to the top of their scopes.

```sh
jscodeshift -t shopify-codemods/transforms/empty-func-to-lodash-noop <file>
```

### Example

```js
foo(() => {});
bar(function() {});
const baz = {
  qux: () => {},
};
function fuzz() {}

// BECOMES:

foo(_.noop);
bar(_.noop);
const baz = {
  qux: _.noop,
}
function fuzz() {}
```
