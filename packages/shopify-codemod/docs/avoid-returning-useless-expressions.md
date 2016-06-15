### `avoid-returning-useless-expressions`

Removes any return arguments that are known to always evaluate to `undefined`. The list of methods that always return `undefined` is configurable using the `methodsReturningVoid` option.

```sh
jscodeshift -t shopify-codemods/transforms/avoid-returning-useless-expressions <file>
```

#### Example

```js
// using methodsThatIgnoreReturnValues: [{object: 'console', methods: ['log']}]
function foo() {
  return console.log('bar');
}

// BECOMES

function foo() {
  console.log('bar');
  return;
}
```
