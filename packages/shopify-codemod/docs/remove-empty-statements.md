### `remove-empty-statements`

Removes empty statements, which usually manifest as unnecessary semicolons.

```sh
jscodeshift -t shopify-codemods/transforms/remove-empty-statements <file>
```

### Example

```js
export function foo() {};

// BECOMES:

export function foo() {}
```
