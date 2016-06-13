### `add-missing-parseint-radix`

Transforms `parseInt` (including `Number.parseInt`) calls to have a radix parameter of `10` if none is provided. Note that, depending on the strings being passed to this call, this may change the result, so only use this when you are certain that any calls missing a radix should have a radix of `10`.

```sh
jscodeshift -t shopify-codemods/transforms/add-missing-parseint-radix <file>
```

### Example

```js
parseInt('42');
parseInt('1111', 2);
Number.parseInt('42');

// BECOMES:

parseInt('42', 10);
parseInt('1111', 2);
Number.parseInt('42', 10);
```
