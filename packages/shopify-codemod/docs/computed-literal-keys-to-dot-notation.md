### `computed-literal-keys-to-dot-notation`

Transforms member expressions that have string literal keys to use dot notation whenever possible.

```sh
jscodeshift -t shopify-codemods/transforms/rename-identifier <file>
```

#### Example

```js
foo['bar']['baz'] = 'qux';
this['_foo'] = 'bar';
foo[0] = 42;
foo['bar-baz'] = 'qux';
foo[bar] = 'qux';

// BECOMES:

foo.bar.baz = 'qux';
this._foo = 'bar';
foo[0] = 42;
foo['bar-baz'] = 'qux';
foo[bar] = 'qux';
```
