### `global-assignment-to-default-export`

Use magic to automatically transform global variable references into import statements.

This transform is meant to be used in conjuction with [sprockets-commoner](https://github.com/Shopify/sprockets-commoner) (which is not open source at time of writing). It depends on `appGlobalIdentifiers` being set to an array of strings containing the global namespaces of your application (`App` in this example).

```sh
jscodeshift -t shopify-codemods/transforms/global-assignment-to-default-export <file>
```

#### Example

```js
App.whatever = 1;

// BECOMES:

'expose App.whatever';
export default 1;
```
