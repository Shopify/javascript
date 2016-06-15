### `global-reference-to-import`

Use magic to automatically transform global variable references into import statements.

This transform is meant to be used in conjuction with [sprockets-commoner](https://github.com/Shopify/sprockets-commoner) (which is not open source at time of writing). It depends on `appGlobalIdentifiers` being set to an array of strings containing the global namespaces of your application (`App` in this example). It also requires `javascriptSourceLocation` to be set to a folder containing all the source files.

```sh
jscodeshift -t shopify-codemods/transforms/global-reference-to-import <file>
```

#### Example

```js
console.log(App.Components.UIList);

// BECOMES:

import UIList from 'app/components/ui_list';
console.log(UIList);
```
