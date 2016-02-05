# eslint-config-shopify

[![Build status][circle-image]][circle-url] [![NPM version][npm-image]][npm-url]

This package provides Shopify's `.eslintrc` as an extensible shared config.

## Usage

### React

Install this module, as well as the other eslint modules on which it is dependent:

```shell
npm install --save-dev eslint babel-eslint eslint-plugin-react eslint-plugin-shopify # dependencies
npm install --save-dev eslint-config-shopify
```

then, extend the React version of this configuration in your own `.eslintrc.json`:

```json
{
  "extends": "shopify/react"
}
```

### ES2015 and Beyond Projects

Install this module, as well as the other eslint modules on which it is dependent:

```shell
npm install --save-dev eslint babel-eslint eslint-plugin-shopify # dependencies
npm install --save-dev eslint-config-shopify
```

then, extend the base version of this configuration in your own `.eslintrc`:

```json
{
  "extends": "shopify"
}
```

### ES5 Projects

Projects with a legacy codebase or that target a tool that targets node may continue to use ES5. To lint these projects, first install this module, as well as the other eslint modules on which it is dependent:

```shell
npm install --save-dev eslint eslint-plugin-shopify # dependencies
npm install --save-dev eslint-config-shopify
```

then, extend the ES5 version of this configuration in your own `.eslintrc`:

```json
{
  "extends": "shopify/es5"
}
```

[npm-url]: https://npmjs.org/package/eslint-config-shopify
[npm-image]: http://img.shields.io/npm/v/eslint-config-shopify.svg?style=flat-square
[circle-url]: https://circleci.com/gh/Shopify/eslint-config-shopify
[circle-image]: https://circleci.com/gh/Shopify/eslint-config-shopify.svg?&style=shield&circle-token=3734ea0a376393800642813772f4b474c7a14a4e
