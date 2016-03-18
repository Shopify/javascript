# Changelog

## 10.2.0

- Added the initial `shopify-codemod` package.

## 10.1.1

- Set the default config of `shopify/require-flow` to disabled.

## 10.1.0

- Added `babel-plugin-transform-inline-environment-variables` to `babel-preset-shopify`.

## 10.0.0

### Added

- Added the `babel-preset-shopify` package to contain our recommended set of Babel transforms.

### Build

- Removed `rimraf` and `copyfiles` as dependencies and used the native UNIX commands instead.

## 9.0.2

### Fixed

- Fixed `react/display-name`’s `ignoreTranspilerName`, again (the new option negated the meaning of the passed value).

## 9.0.1

### Fixed

- Fixed `react/display-name`’s `ignoreTranspilerName` option (the old option name was removed in the most recent version of the plugin).

## 9.0.0

### Added

- Added new React ESLint rules: `jsx-space-before-closing` and `sort-prop-types`.

### Updated

- Updated Babel ESLint plugin.
- Updated the React `sort-comp` rule to require static members of a React component appearing first.
- Documented preference for storing configuration in `package.json`, or in `.js` files when `package.json` is not possible.

### Removed

- Removed deprecated React ESLint rule: `jsx-sort-prop-types`.

### Build

- Updated ESLint and Babel configs to match our recommended locations (`package.json` and `.eslintrc.js`).

## 8.0.0

### Changed

- Updated ESLint peer dependency to 2.1.0.
- Consolidated `eslint-config-shopify` into `eslint-plugin-shopify` as part of the new plugin configs offered by ESLint 2.0.0. This means that only a single package needs to be installed: `eslint-plugin-shopify`. The `"extends"` key in your `.eslintrc` will need to change to reflect this: `"shopify"` becomes `"plugin:shopify/esnext"`, `"shopify/react"` becomes `"plugin:shopify/react"`, and `"shopify/es5"` becomes `"plugin:shopify/es5"`.
- Moved `babel-eslint` and `eslint-plugin-react` to be dependencies of the new plugin, which means that consuming projects no longer need to install those dependencies themselves.
- Made `generator-eslint-shopify` understand and install the correct packages.

### Added

- Added new ESLint rules: `array-callback-return`, `id-blacklist`, `keyword-spacing`, `newline-per-chained-call`, `no-confusing-arrow`, `no-empty-function`, `no-extra-label`, `no-implicit-globals`, `no-new-symbol`, `no-restricted-imports`, `no-self-assign`, `no-unmodified-loop-condition`, `no-unused-labels`, `no-useless-constructor`, `no-whitespace-before-property`, `one-var-declaration-per-line`, `prefer-rest-params`, `sort-imports`, `template-curly-spacing`, and `yield-star-spacing`.

### Removed

- Removed deprecated ESLint rules: `no-arrow-condition`, `no-empty-label`, `space-after-keywords`, `space-before-keywords`, and `space-return-throw-case`.


## 7.0.1 (February 8, 2015)

### Fixed

- Added back `merge` for `eslint-config-shopify` to prevent issues with older versions of node.

## 7.0.0 (February 8, 2015)

- Initial commit of the new repo structure.
