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

## Contributing

If there are rules that you wish to alter for your particular project, feel free to do so in your own `.eslintrc`. Rule declarations you make there will override the rules declared by this configuration. If you feel that a particular rule choice is poor and should be changed for all projects using this configuration, please open a PR [against this repo on Github](https://github.com/Shopify/eslint-config-shopify).

For changes to existing rules, bump the major version. For addition of new rules, bump the minor version. For all other corrections and updates, bump the patch version. These can easily be done by running `npm publish <version>`, where `version` is either `major`, `minor`, or `patch`.

## Changelog

### 5.8.0

Updated `eslint-plugin-react` dependency to 3.14, and added the newly introduced rules.

### 5.7.1

Removed `no-arrow-condition` for `ecmascript-6` that conflicted with `arrow-body-style` rule

### 5.7.0

Updated `eslint` dependency to 1.10 and `eslint-plugin-react` dependency to 3.11, and added the new rules introduced up that point.

### 5.6.1

Fix non-prefixed React plugin rule.

### 5.6.0

Add new React plugin rules: `prefer-es6-class`, `no-direct-mutation-state`, and `forbid-prop-types`.

### 5.5.0

Converts most rules to being warnings rather than errors. Rules that catch existing bugs or that are considered bad practices are still treated as errors.

### 5.4.0

Adds the new rules from `eslint-plugin-shopify`.

### 5.3.6

Added `eslint-plugin-shopify` to the ES5 config to avoid it dying on those rules.

### 5.3.5

Loosens restriction on usage of `this` outside of objects and classes.

### 5.3.4

Add `_` as an exception to the identifier length rule.

### 5.3.3

Demote `console.log` to a warning.

### 5.3.2

Allow node things in ES6 config (for Webpack-style imports, like React's images).

### 5.3.1

Fix issue where ES6 config was not inheriting from core config.

Added a few more exceptions to identifier length rule.

### 5.3.0

Reorganized the project to have a core set of rules that are added to by each config (instead of setting and overriding).

Allow non-global requires.

### 5.2.2

Fixed some issues with the parsers and plugins specified by the configs.

### 5.2.1

Fixed a dependency issue.

### 5.2.0

Added the Shopify plugin and initial rule defaults.

### 5.1.0

Added an ES5 version of the config.

Added a few minor exceptions to the `id-length` rule.

### 5.0.0

Prevent implicit coercions.

### 4.0.0

Force `let` in all cases. `const` is allowed but not enforced (use it sparingly to indicate immutable primitives).

Force function declarations (`function foo() {}`) over function expressions (`var foo = function() {}`).

Force variable initialization at definition (i.e., no `let foo;`, must be assigned).

Force parens for arrow function parameters regardless of arity, and force spaces around the actual arrow.

Prefer template strings over concatenation, and spread (`...`) over `.apply()`.

Other minor rule additions and updates.

### 3.0.4

Allow function declarations to be used before defined (avoids issues with, for example, functions that call each other recursively).

### 3.0.3

Avoid escape in quote styles.

### 3.0.2

Forgot to bump to package.json version.

### 3.0.1

Use jsx-quotes instead of react/jsx-quotes.

### 3.0.0

Enforce trailing commas on multiline literals.

Enforce double quotes for JSX to be in line with XML.

Don't allow spacing inside object literals.

### 2.0.1

Fixed typo in one rule. Minor project cleanup.

### 2.0.0

All warnings are now errors. Removed some rules relating to complexity, maximum length, and nesting depth.

### 1.0.7

Loosens restriction on `==` for `null` checking (which Flow requires for Maybe types).

### 1.0.6

Adds global Flow types for React (`ReactClass` and `ReactElement`).

### 1.0.5

Prefer `var` until Flow adds support for `const`/ `let`.

### 1.0.4

Allow `continue`

### 1.0.3

Prefer `const`/ `let`.

### 1.0.2

Updated React linting rules.

### 1.0.1

Removed unnecessary dependencies.

### 1.0.0

Initial commit.

[npm-url]: https://npmjs.org/package/eslint-config-shopify
[npm-image]: http://img.shields.io/npm/v/eslint-config-shopify.svg?style=flat-square
[circle-url]: https://circleci.com/gh/Shopify/eslint-config-shopify
[circle-image]: https://circleci.com/gh/Shopify/eslint-config-shopify.svg?&style=shield&circle-token=3734ea0a376393800642813772f4b474c7a14a4e
