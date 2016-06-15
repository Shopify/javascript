### `rename-property`

Renames a user-defined list of object/ property pairs to use new property names. Use the `renameProperties` option to specify the old property name/ new property name pairs.

```sh
jscodeshift -t shopify-codemods/transforms/rename-property <file>
```

#### Example

```js
// with {renameProperties: {_: {first: 'head'}}}
_.first([]);
_.first.bind(_);
foo._.first([]);
_.each([]);

// BECOMES:

_.head([]);
_.head.bind(_);
foo._.first([]);
_.each([]);
```
