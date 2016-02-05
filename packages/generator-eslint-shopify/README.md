# generator-eslint-shopify

[![NPM version][npm-image]][npm-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Build Status][travis-image]][travis-url]

> A Yeoman generator for creating a Shopify-focused ESLint config.

## Installation

First, install [Yeoman](http://yeoman.io) and generator-esnext-test using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo
npm install -g generator-eslint-shopify
```

Then generate your ESLint configuration:

```bash
yo eslint-shopify
```

## What You Get

The following is installed by this generator (`test/.eslintrc` is only installed when the `needsTest` option/ prompt is true, and the test directory can be configured with the `testDir` option/ prompt):

```
|-- .eslintrc
|-- .eslintignore
|-- test/
  |-- .eslintrc
```

The generator prompts will take you through setting up your config, including what environments you are working in and what directories/ rules to ignore. The `package.json` file is created if it does not exist, and the `scripts` property is augmented with a `lint` command.

## Getting To Know Yeoman

 * Yeoman has a heart of gold.
 * Yeoman is a person with feelings and opinions, but is very easy to work with.
 * Yeoman can be too opinionated at times but is easily convinced not to be.
 * Feel free to [learn more about Yeoman](http://yeoman.io/).

[npm-image]: https://badge.fury.io/js/generator-eslint-shopify.svg
[npm-url]: https://npmjs.org/package/generator-eslint-shopify

[daviddm-image]: https://david-dm.org/Shopify/generator-eslint-shopify.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/Shopify/generator-eslint-shopify

[travis-image]: https://travis-ci.org/Shopify/generator-eslint-shopify.svg?branch=master
[travis-url]: https://travis-ci.org/Shopify/generator-eslint-shopify
