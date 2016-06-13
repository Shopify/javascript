### `coffeescript-range-output-to-helper`

Changes the output of CoffeeScript’s range operator (`[foo...bar]`) into a reference to Shopify’s global range helper. Because this creates a global, you should run the `global-reference-to-import` transform after this one.

```sh
jscodeshift -t shopify-codemod/transforms/coffeescript-range-output-to-helper <file>
```

#### Example

```js
// [this.qux..foo.bar.baz()] in CoffeeScript

(function() {
  var ref;
  var results = [];

  for (var i = ref = this.qux, ref1 = foo.bar.baz(); (ref <= ref1 ? i <= ref1 : i >= ref1); (ref <= ref1 ? i++ : i--)) {
      results.push(i);
  }

  return results;
}).apply(this);


// BECOMES:

Shopify.range({
  from: this.qux,
  to: foo.bar.baz(),
  inclusive: true
});

```
