### `convert-default-export-objects-to-named-exports`

Transforms an exported object literal such that each property of the exported object becomes a named export.

```sh
jscodeshift -t shopify-codemods/transforms/convert-default-export-objects-to-named-exports <file>
```

#### Example

```js
export default {
  foo: 'bar',
  baz: qux,
}

// BECOMES:

export const foo = 'bar';
export const baz = qux;
```
