# esify

`esify` is a combination of various tools with the purpose of automatically translating Shopify’s CoffeeScript to ESNext. Unless you work at Shopify, you probably don’t need this.

## Installation

```sh
npm install -g esify
```

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
}
```
