### `arguments-to-args-spread`

In functions that reference `arguments`, adds an explicit `...args` spread to the function parameters, and replaces `arguments` references with `args`.  If a named spread already exists, `arguments` references will be renamed to use the existing spread name.

See eslint's [`prefer-rest-params`.](http://eslint.org/docs/rules/prefer-rest-params)) rule for more details.

```sh
jscodeshift -t shopify-codemods/transforms/arguments-to-args-spread <file>
```

### Example

```js
function foo() {
  bar(arguments);
}

function foo() {
  console.log(arguments);
  bar(() => {
    console.log(arguments);
  });
}

// BECOMES:

function foo(...args) {
  bar(args);  
}

function foo(...args) {
  console.log(args);
  bar(() => {
    console.log(args);
  });
}
```
