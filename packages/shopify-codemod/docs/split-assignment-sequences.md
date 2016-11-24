### `split-assignment-sequences`

Splits `decaf`-generated assignment sequences into individual expressions, and removes their useless trailing return value.

```sh
jscodeshift -t shopify-codemod/transforms/split-assignment-sequences <file>
```

#### Example

```js
foo = options.foo, bar = options.bar, options;

this.foo = opts.foo, bar = opts.bar, opts;

// BECOMES:

foo = options.foo
bar = options.bar

this.foo = opts.foo
this.bar = opts.bar
```
