# Changelog

## [Unreleased]
### Added
- Added a `global-identifier-to-import` transform to import any global from a user-provided list used in a module. ([#90](https://github.com/Shopify/javascript/pull/90))
- Added a `remove-trailing-else-undefined-return` transform to remove useless trailing alternate returns. ([#91](https://github.com/Shopify/javascript/pull/91))
- Added a `convert-default-export-objects-to-named-exports`. ([#129](https://github.com/Shopify/javascript/pull/129))
- Updated ESLint and all plugins for `eslint-plugin-shopify`, which added the following rules (in addition to many fixes): `ava/assertion-arguments`, `babel/flow-object-type`, `import/no-extraneous-dependencies`, `import/no-mutable-exports`, `import/no-nodejs-modules`, `import/extensions`, `import/order`, `import/newline-after-import`, `import/prefer-default-export`, `lodash/consistent-compose`, `no-unsafe-finally`, and `react/jsx-no-target-blank`. ([#93](https://github.com/Shopify/javascript/pull/93))
- `esify` now accepts multiple files or glob patterns for conversion. ([#89](https://github.com/Shopify/javascript/pull/89))

### Changed
- Reorganized transforms to catch more issues. ([#90](https://github.com/Shopify/javascript/pull/90))
- `remove-useless-return-from-test` transform now also removes trailing IIFEs. ([#90](https://github.com/Shopify/javascript/pull/90))
- Changed `object-shorthand` linting rule to `warn` (was `off`), except in cases where the keys of objects require quotes. ([#93](https://github.com/Shopify/javascript/pull/93))
- Changed `object-shorthand` linting rule to `warn` (was `off`) when single-line object literals have spaces inside the curly braces. ([#93](https://github.com/Shopify/javascript/pull/93))
- `global-reference-to-import` transform now avoids importing the file itself when using the global name of the exported object. It also uses a global cache for lookups, which increases the speed of transformations for large groups of files. ([#131](https://github.com/Shopify/javascript/pull/131))

### Removed
- Removed `generator-eslint-shopify`. ([#93](https://github.com/Shopify/javascript/pull/93))

### Build
- Updated all development dependencies. ([#93](https://github.com/Shopify/javascript/pull/93))
- Added scripts for generating new transforms and renaming existing transforms. ([#130](https://github.com/Shopify/javascript/pull/130))

## [11.2.0]
### Added
- Added `coffeescript-soak-to-condition` transform to better handle CoffeeScript’s soak and existential operator.
- Added `remove-addeventlistener-returns` and `remove-empty-returns` transforms to remove unecessary transforms left from CoffeeScript conversions.

### Fixed
- Improved the order of transforms so that the most generic/ stylistic transforms are run last.

## [11.1.3]
### Fixed
- Moved more generic transforms to the end of `esify`’s transform list to ensure that they pick up any changes introduced in earlier transforms.
- Improved CoffeeScript range transform.
- Misconfigured eslint rules in `esify`.

### Added
- Added flexible `esify` configuration (`esify.config.js`.)
- Added `constructor-literal-assignment-to-class-property` transform that converts static/instance constructor assignments to class properties.
- Added `strip-template-literal-parenthesis` transform that removes unnecessary parenthesis from template strings.
- Added more `jsx-a11y` rules.

### Changed
- Updated `jsx-a11y` rules.
- Style guide no longer recommends `shopify/prefer-class-properties`.
- Removed `prefer-class-properties` warning removed from `eslint-plugin-shopify`.

## [11.1.2]
### Fixed
- Fixed an issue where `jquery-dollar-sign-reference` would incorrectly report `null` values.

## [11.1.1]
### Fixed
- Fixed a configuration error in `eslint-plugin-react`.

## [11.1.0]
### Added
- Added a `no-fully-static-classes` rule to prevent classes with only static members.
- Added a code of conduct.

## [11.0.2]
### Fixed
- Fixed an error in `sinon-prefer-meaningful-assertions` when there was an empty `expect` call expression.
- Fixed an error in `prefer-early-return` related to conditional expressions that consist only of a single expression.

## [11.0.1]
### Fixed
- Fixed a case where the `jquery-dollar-sign-reference` rule would fail when a name in a jQuery chain matched a built-in object property name.

## [11.0.0]
### Added
- Added additional ESLint rules to the ESNext shared configuration from the following plugins: `eslint-plugin-sort-class-members`, `eslint-plugin-import`, and `eslint-plugin-promise`, which provide additional linting rules around classes, `import`/ `export` statements, and promises.
- Added additional plugins and custom configurations for lodash, mocha/ sinon/ chai, AVA, flow, and jQuery. These custom configurations are exported by `eslint-plugin-shopify`, and are meant to be used in addition to the `es5`, `esnext`, or `react` core configurations. See the `eslint-plugin-shopify` readme for details.
- Added additional accessibility-related rules to the `react` shared ESLint configuration.
- Added the following custom ESLint rules to the relevant configurations: `class-property-semi`, `jquery-dollar-sign-reference`, `no-useless-computed-properties`, `prefer-class-properties`, `prefer-early-return`, `restrict-full-import`, `sinon-no-restricted-features`, and `sinon-prefer-meaningful-assertions`.
- Added `esify`, a tool for converting Shopify’s CoffeeScript to JavaScript, as a package in this repo.

### Changed
- Removed node-related rules from the `es5` shared configuration. Node rules (including some new rules to help with pragmas and `require` statements) are now available through a separate `node` shared configuration, which is meant to be used in conjunction with one of the core configurations.
- Updated versions of `eslint` and `eslint-plugin-shopify`.

### Build
- Updated all development dependencies to the latest versions.

## [10.10.11]
### Added
- Added a `coffeescript-range-output-to-helper` transform to `shopify-codemod` to provide a better conversion for CoffeeScript range syntax.

## [10.10.1]
### Fixed
- Renamed `mocha-context-to-global-references` transform to `mocha-context-to-global-reference`.

## [10.10.0]
### Added
- Added a `mocha-context-to-global-reference` transform to `shopify-codemod` to transform uses of context-injected properties (from, for instance, a sinon sandbox) to use a specified global instead.
- Added Enzyme as a recommended utility for testing React codebases.

## [10.9.0]
### Added
- Added a `conditional-assign-to-if-statement` transform to `shopify-codemod` to convert the common CoffeeScript translation idiom of `foo || (foo = bar)` into a more appropriate JavaScript idiom.

## [10.8.1]
### Fixed
- Updated the `mocha-context-to-closure` rule to also transform uses of `this` inside contextually-declared functions.

### Build
- Updated version of `npm` used in CI.

## [10.8.0]
### Added
- Added `eslint-plugin-babel` as a dependency for `eslint-plugin-shopify` to fix some linting issues with ESNext features. Most notably, this fixes the way `object-curly-spacing` would fail on some `import` statements, and how `arrow-parens` would fail for `async` functions. The following rules are now updated to use the `eslint-plugin-babel` equivalents: `array-bracket-spacing`, `arrow-parens`, `generator-star-spacing`, `new-cap`, `no-await-in-loop`, `object-curly-spacing`, and `object-shorthand`.
- Added new ESLint rules: `no-useless-escape`, `no-duplicate-imports`, `no-restricted-globals`, and `max-statements-per-line`.
- Added a new `eslint-plugin-react` rule: `prefer-stateless-function` (off by default, because of issues with React’s testing utilities).

### Changed
- Used the new string severity levels introduced in ESLint 2.5.0.

### Build
- Bumped the node version for the project.
- Updated to the most recent versions of dependencies.

## [10.7.1]
### Fixed
- Prevents the two transforms added in `10.7.0` from clobbering existing directives.

## [10.7.0]
### Added
- Added `global-assignment-to-default-export` transform, which automatically exports a single global set within a given file.
- Added `global-reference-to-import` transform, which searches through the file system to find the source of a global reference, and transforms that reference into the appropriate identifier and `import` statement.

## [10.6.2]
### Fixed
- Prevented `function-to-arrow` transform in `shopify-codemod` from incorrectly transforming methods using the shorthand syntax.

## [10.6.1]
### Build
- Set up the babel config for `shopify-codemod`.

## [10.6.0]
### Added
- Add `remove-useless-return-from-test` rule to `shopify-codemod` repo, which removes unnecessary `return`s at the end of test files that the CoffeeScript to JavaScript conversion leaves behind.

## [10.5.0]
### Added
- Extracted `chai-jscodeshift` into its own package.

### Build
- Moved all shared development dependencies to be in the root `package.json` in order to speed up bootsrapping. Only project-specific development dependencies should be in the individual projects.

## [10.4.0]
### Added
- Add `function-to-arrow` transform.

## [10.3.2]
### Added
- Add `constant-function-expression-to-statement` transform.
- Add `ternary-statement-to-if-statement` transform.

## [10.2.0]
### Added
- Added the initial `shopify-codemod` package.

## [10.1.1]
### Changed
- Set the default config of `shopify/require-flow` to disabled.

## [10.1.0]
### Changed
- Added `babel-plugin-transform-inline-environment-variables` to `babel-preset-shopify`.

## [10.0.0]
### Added
- Added the `babel-preset-shopify` package to contain our recommended set of Babel transforms.

### Build
- Removed `rimraf` and `copyfiles` as dependencies and used the native UNIX commands instead.

## [9.0.2]
### Fixed
- Fixed `react/display-name`’s `ignoreTranspilerName`, again (the new option negated the meaning of the passed value).

## [9.0.1]
### Fixed
- Fixed `react/display-name`’s `ignoreTranspilerName` option (the old option name was removed in the most recent version of the plugin).

## [9.0.0]
### Added
- Added new React ESLint rules: `jsx-space-before-closing` and `sort-prop-types`.

### Changed
- Updated Babel ESLint plugin.
- Updated the React `sort-comp` rule to require static members of a React component appearing first.
- Documented preference for storing configuration in `package.json`, or in `.js` files when `package.json` is not possible.

### Removed
- Removed deprecated React ESLint rule: `jsx-sort-prop-types`.

### Build
- Updated ESLint and Babel configs to match our recommended locations (`package.json` and `.eslintrc.js`).

## [8.0.0]
### Changed
- Updated ESLint peer dependency to 2.1.0.
- Consolidated `eslint-config-shopify` into `eslint-plugin-shopify` as part of the new plugin configs offered by ESLint 2.0.0. This means that only a single package needs to be installed: `eslint-plugin-shopify`. The `"extends"` key in your `.eslintrc` will need to change to reflect this: `"shopify"` becomes `"plugin:shopify/esnext"`, `"shopify/react"` becomes `"plugin:shopify/react"`, and `"shopify/es5"` becomes `"plugin:shopify/es5"`.
- Moved `babel-eslint` and `eslint-plugin-react` to be dependencies of the new plugin, which means that consuming projects no longer need to install those dependencies themselves.
- Made `generator-eslint-shopify` understand and install the correct packages.

### Added
- Added new ESLint rules: `array-callback-return`, `id-blacklist`, `keyword-spacing`, `newline-per-chained-call`, `no-confusing-arrow`, `no-empty-function`, `no-extra-label`, `no-implicit-globals`, `no-new-symbol`, `no-restricted-imports`, `no-self-assign`, `no-unmodified-loop-condition`, `no-unused-labels`, `no-useless-constructor`, `no-whitespace-before-property`, `one-var-declaration-per-line`, `prefer-rest-params`, `sort-imports`, `template-curly-spacing`, and `yield-star-spacing`.

### Removed
- Removed deprecated ESLint rules: `no-arrow-condition`, `no-empty-label`, `space-after-keywords`, `space-before-keywords`, and `space-return-throw-case`.


## [7.0.1]
### Fixed
- Added back `merge` for `eslint-config-shopify` to prevent issues with older versions of node.

## [7.0.0]
- Initial commit of the new repo structure.
