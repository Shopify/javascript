# babel-preset-shopify

[![NPM version][npm-image]][npm-url]

Shopify’s org-wide set of Babel transforms.

## Usage

Install this package, as well as the parts of Babel you wish to use:

```bash
npm install babel-core babel-preset-shopify --save-dev --save-exact
```

Then, in your Babel configuration (which should be under the `babel` key of your `package.json`, set this package as the babel preset you’d like to use):

```json
{
  "babel": {
    "presets": ["shopify"]
  }
}
```

### React

This preset exposes a preset specific to React that you can use with the following configuration:

```json
{
  "babel": {
    "presets": ["shopify/react"]
  }
}
```

### Node

This preset also exposes presets that transpile only the subset of ES2015 required for different versions of node.js. You can get the appropriate preset by extending the `shopify/node/<version number>` babel configuration:

```json
{
  "babel": {
    "presets": ["shopify/node/5"]
  }
}
```

The following node.js versions have a dedicated preset: `5`, `5.1`, `5.2`, `5.3`, `5.4`, `5.5`, `5.6`, `5.7`, `5.8`, `5.9`, `5.10`, `5.11`, `6`, `6.1`, and `6.2`.

[npm-url]: https://npmjs.org/package/babel-preset-shopify
[npm-image]: http://img.shields.io/npm/v/babel-preset-shopify.svg?style=flat-square
