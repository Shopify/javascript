### `implicit-coercion-to-explicit`

Transforms implicit coercions to booleans (`!!foo`) and numbers (`+foo`) to their explicit counterparts (`Boolean(foo)` and `Number(foo)`, respectively).

```sh
jscodeshift -t shopify-codemods/transforms/implicit-coercion-to-explicit <file>
```

### Example

```js
!!foo;
+foo;

// BECOMES:

Boolean(foo);
Number(foo);
```
