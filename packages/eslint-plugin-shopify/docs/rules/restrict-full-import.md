# Prevents importing the entirety of a package. (restrict-full-import)

Importing the entirety of a large module can be undesirable because it becomes harder to track what properties are being used.

## Rule Details

This rule aims to restrict the imports of specified modules to only be an import of specific properties. This does **not** mean that you are not importing from the module, it simply means that you only extract the properties you need.

This rule takes a single argument, an array of module names that should not be fully imported.

The following patterns are considered warnings with the option `['lodash']`:

```js
import _ from 'lodash';
import _, {chain} from 'lodash';
import {default as _} from 'lodash';
import * as _ from 'lodash';

var _ = require('lodash');
var {chain, ...rest} = require('lodash');
```

The following patterns are not warnings:

```js
import _ from 'something-else';
import {chain, map} from 'lodash';
import chain from 'lodash/chain';

var _ = require('something-else');
var chain = require('lodash').chain;
var chain = require('lodash/chain');
var {chain} = require('lodash');
```

## When Not To Use It

If you do not want to restrict from full imports from modules, you can safely disable this rule.
