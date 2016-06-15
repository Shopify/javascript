# esify

`esify` is a combination of various tools with the purpose of automatically translating Shopify’s CoffeeScript to ESNext. Unless you work at Shopify, you probably don’t need this.

## Installation

```sh
npm install -g esify
```

## Limitations

The tools on which `esify` is build have certain limitations that prevent us from providing the ideal conversion in some cases. We strongly recommend you have our linting configuration, [`eslint-plugin-shopify`](../eslint-plugin-shopify), set up for your project before beginning to translate in order to easily identify small translation errors (unused or missing references, indentation, etc). Below is a list of limitations that you should check for in the code you are converting:

- All comments will be removed in the transformed output (including Sprockets directives)
- CoffeeScript soak calls with embedded methods (e.g., `foo.bar()?.baz`) will compile to JavaScript that is hard to read
- Assignment to a global outside of the file creating that global will result in incorrect exports (e.g., `Shopify.UIPopover.foo = 'bar'` outside the file declaring `Shopify.UIPopover.foo`)
- Strings and regular expressions with complex escapes might be converted improperly
- Multiline CoffeeScript strings become a single-line string with newlines inserted as needed

## Usage

From the root of the Shopify directory, run this script with a single, relative CoffeeScript file, or a glob pattern. Wait for it to finish, and marvel at the clean ESNext code that is spit out beside the original file! Note this script does not delete the original CoffeeScript file — you should review the output before pushing any changes.

```sh
esify app/assets/javascripts/admin/lib/*.coffee
```

You can provide custom options to `esify` by adding an `esify.config.js` file to the directory from which you are running the `esify` command. An example configuration is shown below:

```js
// your-project/esify.config.js
var path = require('path');

module.exports = {
  // The global namespaces used in your current JavaScript code.
  appGlobalIdentifiers: ['Shopify'],

  // The root folder for your JavaScripts
  javaScriptSourceLocation: path.join(__dirname, 'app/assets/javascripts'),

  // The output style for your code. You can see all available options in the Recast docs:
  // https://github.com/benjamn/recast/blob/master/lib/options.js
  printOptions: {
    quote: 'single',
    trailingComma: true,
    tabWidth: 2,
    wrapColumn: 1000,
  },

  // The options for the mocha-context-to-global-reference shopify-codemod transform
  testContextToGlobals: {
    testClock: {
      properties: ['clock'],
      replace: true,
    },
    sandbox: {
      properties: ['spy', 'stub', 'mock', 'server', 'requests'],
    },
  },

  // A list of globals and their associated import paths for global-identifier-to-import
  globalIdentifiers: {
    _: 'lodash',
    $: 'jquery',
    moment: 'moment',
  },
  // A list of identifiers to rename for rename-identifier
  renameIdentifiers: {
    jQuery: '$',
  },
  // A list of identifiers and their properties that should be renamed for rename-property
  renameProperties: {
    _: {
      first: 'head',
      each: 'forEach',
      eachRight: 'forEachRight',
      entries: 'toPairs',
      entriesIn: 'toPairsIn',
      extend: 'assignIn',
      extendWith: 'assignInWith',
    },
  },
  // A list of object/ property pairs that always ignore return values of any
  // callbacks passed to them
  methodsThatIgnoreReturnValues: [
    {
      object: '_',
      methods: ['each'],
    },
    {
      object: /.*/,
      methods: ['forEach'],
    },
  ],
  // A list of object/ property pairs that always return undefined when called
  methodsReturningVoid: [
    {
      object: 'console',
      methods: ['log', 'warn'],
    },
    {
      object: /^(e|evt|event)$/,
      methods: ['preventDefault'],
    },
    {
      object: /.*/,
      methods: ['forEach'],
    },
    {
      object: '_',
      methods: ['each'],
    },
  ],
}
```
