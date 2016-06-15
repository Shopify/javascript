### `global-identifer-to-import`

Creates import statements for global identifiers. Use the `globalIdentifiers` option to specify identifier/ import path pairs.

```sh
jscodeshift -t shopify-codemods/transforms/global-identifier-to-import <file>
```

#### Example

```js
// with {globalIdentifiers: {_: 'lodash', $: 'jquery'}}
_.map([], _.identity);
window.$('.foo').find('.bar');

// BECOMES:

import _ from 'lodash';
import $ from 'jquery';
_.map([], _.identity);
$('.foo').find('.bar');
```
