### `avoid-returning-unused-results`

Removes return values from callbacks passed to functions that are known to ignore the return result. The list of methods that ignore the result is configurable using the `methodsThatIgnoreReturnValues` option.

```sh
jscodeshift -t shopify-codemods/transforms/avoid-returning-unused-results <file>
```

#### Example

```js
// using methodsThatIgnoreReturnValues: [{object: '_', methods: ['each']}]
_.each(foo, () => {
  return foo.bar();
});

// BECOMES

_.each(foo, () => {
  foo.bar();
  return;
});
```
