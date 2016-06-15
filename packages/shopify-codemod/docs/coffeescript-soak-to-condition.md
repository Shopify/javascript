### `coffeescript-soak-to-condition`

Changes the output of CoffeeScript’s soak operations (`foo?.bar.baz?()`) into a cleaner, more idiomatic JavaScript expression appropriate for its location in code.

```sh
jscodeshift -t shopify-codemod/transforms/coffeescript-soak-to-condition <file>
```

#### Example

```js
// foo = bar?.baz?()
var foo = typeof bar !== 'undefined' && bar !== null ? (typeof bar.baz === 'function' ? bar.baz() : void 0) : void 0;

// BECOMES

if (bar != null && typeof bar.baz === 'function') {
  var foo = bar.baz();
}

// if a?[bar]?()
if (typeof a !== "undefined" && a !== null ? (typeof a[bar] === "function" ? a[bar]() : void 0) : void 0) {

}

// BECOMES

// if a?[bar]?()
// else if a?[bar]?()
if (a != null && typeof a[bar] === 'function' && a[bar]()) {

}
```
