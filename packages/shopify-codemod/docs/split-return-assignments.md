### `split-return-assignments`

Splits up inline return assignments in multiple lines.

```sh
jscodeshift -t shopify-codemod/transforms/split-return-assignments <file>
```

#### Example

```js
foo(() => {
  console.log(bar);
  return this.sho = this.doo = this.zoo = 0;
});

// BECOMES:

foo(() => {
  console.log(bar);
  this.sho = this.doo;
  this.doo = this.zoo;
  this.zoo = 0;
  return this.sho;
});
```
