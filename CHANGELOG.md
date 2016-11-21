# Changelog

## [Unreleased]
### Added
- Eslint rules: `no-return-await`, `no-useless-return`, and `func-name-matching`.

## [15.0.3]
### Changed
- The `react` ESLint config no longer warns about missing `this` in React lifecycle methods.

## [15.0.2]
### Changed
- Removed the `flow/type-id-match` rule.
- Temporarily disabled the `react/forbid-component-props` rule as it throws errors in some cases.

## [15.0.1]
### Fixed
- The Node Babel preset now includes the destructuring transform, which is required for object rest spread.

## [15.0.0]
### Added
- Added separate React (`shopify/react`), Flow (`shopify/flow`), and Web (`shopify/web`) Babel presets to `babel-preset-shopify`.
- Updated all ESLint dependencies, which add the following rules: `ava/no-async-fn-without-await`, `ava/no-duplicate-modifiers`, `class-methods-use-this`, `no-restricted-properties`, `prefer-numeric-literals`, `sort-imports`, `symbol-description`, `flowtype/boolean-style`, `flowtype/delimiter-dangle`, `flowtype/generic-spacing`, `flowtype/generic-spacing`, `flowtype/no-dupe-keys`, `flowtype/no-weak-types`, `flowtype/semi`, `flowtype/sort-keys`, `flowtype/space-before-generic-bracket`, `flowtype/union-intersection-spacing`, `import/no-dynamic-require`, `import/no-internal-modules`, `import/no-absolute-path`, `import/no-webpack-loader-syntax`, `import/unambiguous`, `import/first`, `import/max-dependencies`, `import/no-unassigned-import`, `jsx-a11y/click-events-have-key-events`, `jsx-a11y/no-static-element-interactions`, `mocha/no-hooks-for-single-case`, `mocha/no-identical-title`, `mocha/no-return-and-callback`, `mocha/no-top-level-hooks`, `mocha/no-nested-tests`, `mocha/max-top-level-suites`, `node/exports-style`, `node/no-unpublished-bin`, `react/no-children-prop`, `react/no-unescaped-entities`, `react/no-unused-prop-types`, `react/style-prop-object`, `lines-around-directive`, and `line-comment-position`.

### Changed
- The default Babel preset no longer includes React. If you are writing a web project that uses React, you should use `shopify/web` and `shopify/react` together instead of just using `shopify`.
- The Node preset in `babel-preset-shopify` now accepts an options object specifying whether ES2015 modules should be converted to CommonJS (`modules`) and the target version of Node to transpile for (`version`, defaults to `process.version`).
- Turned off the `no-sync` and `no-process-exit` rules for the Node ESLint config.

### Fixed
- `flowtype/type-id-match` now properly accepts `Props`, `State`, and `Context` as valid type names.

## [14.0.1]
### Changed
- Set `babel/func-params-comma-dangle` to `always-multiline` to be consistent with `comma-dangle`.

## [14.0.0]
### Added
- Updated dependencies which added the following rules: `no-tabs`, `sort-keys`, `no-template-curly-in-string`, `ava/no-nested-tests`, `ava/no-todo-implementation`, `ava/prefer-async-await`, `flowtype/define-flow-type`, `flowtype/use-flow-type`, `flowtype/valid-syntax`, `jsx-a11y/anchor-has-content`, `mocha/no-hooks`, `mocha/no-arrows`, `mocha/no-sibling-hooks`, `mocha/no-synchronous-tests`, `react/forbid-component-props`, and `react/no-danger-with-children`, `react/no-find-dom-node`.
- Added stronger recommendations to use Flow in place of React’s `PropTypes`.
- Added a recomendation to only import the parts of React you need (rather than accessing them as properties on `React`).
- Added recommendations for how to deal with components that have one or more dependant subcomponents.

### Changed
- Changed the `indent` linting rule to require one level of indenting (two spaces) for `case` statements and for member expressions on separate lines.
- Changed the `react/jsx-no-bind` ESLint rule to prevent binding functions in render methods.
- The following rules were renamed or removed based on deprecations in the updates noted above: `no-spaced-func` (to `func-call-spacing`), `no-negated-in-lhs` (to `no-unsafe-negation`), `no-native-reassign` (to `no-global-assign`), `react/no-comment-textnodes` (to `react/jsx-no-comment-textnodes`), `react/require-extension`, and `react/wrap-multilines` (to `react/jsx-wrap-multilines`).
- Updated `flowtype/type-id-match` to allow for any type name ending in `Type`, `Props`, `State`, or `Context`.
- Turned off `react/no-danger` in favor of enabling `react/no-danger-with-children`.

## [13.0.0]
### Added
- Updated ESLint to 3.1, which adds the following rules: `max-lines`, `no-mixed-operators`, `object-curly-newline`, `unicode-bom`, `no-prototype-builtins`, `no-useless-rename`, `multiline-ternary`, and `rest-spread-spacing`.
- Added forgotten ESLint rules: `no-negated-condition`, `no-restricted-syntax`, and `require-jsdoc`.
- Updated other linting plugins, which added the following rules: `babel/func-params-comma-dangle`, `import/no-restricted-paths`, `flowtype/require-valid-file-annotation`, `jsx-a11y/heading-has-content`, `jsx-a11y/html-has-lang`, `jsx-a11y/lang`, `jsx-a11y/no-marquee`, `jsx-a11y/scope`, `mocha/valid-suite-description`, `mocha/valid-test-description`, `node/no-deprecated-api`, `node/process-exit-as-throw`, `promise/no-native`, `react/no-comment-textnodes`, `react/require-optimization`, `react/jsx-handler-names`, `react/jsx-filename-extension`, and `react/no-render-return-value`.

### Changed
- Removed the requirement to omit braces for arrow functions whose body is a single return statement. The styleguide now recommends omitting for simple, single-line return statements, and braces are permitted where they improve legibility.
- Removed lint checks for sorting of properties in React components (the guidance on ordering remains, but the linting rule was too coarse to be useful in all situations).
- Turned off the lint rule requiring a default export in modules exporting only a single binding to allow for modules that make sense as utilities but export only a single named binding.
- Updated all custom ESLint rules in `eslint-plugin-shopify` to use the new ESLint rule format.
- `eslint-plugin-shopify/node` now has errors for missing and unpublished
- `eslint-plugin-shopify/react` now warns when your component could be a functional component (that is, when it has no state and no lifecycle hooks).

### Fixed
- `shopify/require-flow` linting rule now understands flow directives in line comments (in addition to block comments).

### Build
- Added a test for `eslint-plugin-shopify` to fail if it has unconfigured rules from ESLint or any depended-upon plugins.

## [12.3.4]
### Added
- Added a node.js-specific Babel preset to `babel-preset-shopify`, usable by extending the `shopify/node` babel preset.
- Added a `prefer-twine` rule to `eslint-plugin-shopify` to warn on the use of non-`Twine` local identifiers for twine imports.
- Added additional warnings about esify limitations.

### Fixed
- `global-reference-to-import` no longer reports export conflicts in `coffee`/`js` files with the same name (regression introduced in 12.3.0).
- `global-reference-to-import` discovers exports in files with a `.js.erb` suffix
- `avoid-returning-unused-results` now handles additional edge cases.

### Changed
- `eslint-plugin-shopify/mocha` now disables some rules that did not work well with Chai’s `expect` syntax.
- `eslint-plugin-shopify` now ignores imports of style files to play nicely with CSS modules.

## [12.3.3]
### Added
- Added an `existential-assignment-to-if-statement` transform that removes dead code from `decaf`'s `?=` output.
- Added an `arguments-to-args-spread` transform that adds an `...args` spread to functions that reference `arguments`.
- Added a `split-if-assignments` transform that moves assignments out of `if` conditions.
- `arrow-body-style` guidance for a single multiline return.
- Default options for the `global-identifier-to-import` transform to import `twine` when referencing `Bindings` or `Twine` in the original code.

### Fixed
- `ignores-if-else-with-following-statements` now handles argumentless `return` statements.
- `README` now includes details of doc file generation/update for transforms managed by `create-transform`/`rename-transform` scripts.
- `global-reference-to-import` now handles named exports.

### Changed
- Added a looser peer dependency on ESLint for `eslint-plugin-shopify`.

## [12.3.2]
### Added
- Added guidance for installing a search binary to `global-reference-to-import`'s error message.
- Added an `iife-to-ternary-expression` transform that converts some IIFE assignments to ternary assignments.

### Fixed
- `global-assignment-to-default-export` now allows prototype assignments to the default export object.

## [12.3.1]
### Fixed
- Fixed the naming of the `avoid-returning-unused-results` transform.

### Build
- Transform generator script now generates documentation files. ([#180](https://github.com/Shopify/javascript/pull/180))

## [12.3.0]
### Added
- Added a `split-return-assignments` transform to move any returned assignment expressions to be an assignment expression followed by a return statement of just the final value. ([#134](https://github.com/Shopify/javascript/pull/134))
- Added a `avoid-returning-unused-results` transform to remove return statement arguments from callbacks that are known to be ignored by the callee. ([#173](https://github.com/Shopify/javascript/pull/173))
- Added a `avoid-returning-useless-expressions` transform to remove return statement arguments that are known to return `undefined`. ([#173](https://github.com/Shopify/javascript/pull/173))
- Added a `remove-unused-expressions` transform to remove any expression without side effects. ([#173](https://github.com/Shopify/javascript/pull/173))

### Changed
- `esify` no longer changes the case of the transformed file. ([#178](https://github.com/Shopify/javascript/pull/178))

### Fixed
- Fixes the method for running ESLint so it does not spawn a new process for each file. ([#177](https://github.com/Shopify/javascript/pull/177))

### Build
- Moved documentation of all codemods in `shopify-codemod` to be separate markdown files. ([#168](https://github.com/Shopify/javascript/pull/168))

## [12.2.0] - 2016-06-02
### Added
- `esify` now will find and run a locally-installed version of ESLint with the `--fix` flag in order to correct simple formatting issues. ([#152](https://github.com/Shopify/javascript/pull/152))

## [12.1.0] - 2016-06-01
### Added
- Added a `add-missing-parseint-radix` transform to add missing radix parameters to `parseInt` calls. ([#145](https://github.com/Shopify/javascript/pull/145))
- Added a `implicit-coercion-to-explicit` transform to convert `!!foo` and `+foo` to their more explicit counterparts. ([#149](https://github.com/Shopify/javascript/pull/149))
- Added a `empty-func-to-lodash-noop` transform to correct empty function linting errors by replacing empty functions with `_.noop`. ([#148](https://github.com/Shopify/javascript/pull/148))
- Added a `remove-empty-statements` transform to get rid of pesky excess semicolons. ([#151](https://github.com/Shopify/javascript/pull/151))

### Fixed
- Fixed edge cases that were failing for the `default-export-object-to-named-exports` transform. ([#151](https://github.com/Shopify/javascript/pull/151))

### Build
- Fixed the name for transform tests generated by `bin/create-transform`. ([#151](https://github.com/Shopify/javascript/pull/151))

## [12.0.2] - 2016-05-30
### Added
- Added a simple set of warnings for `esify` to signal potentially problematic transformations, and added documentation as to what kinds of CoffeeScript patterns might not translate correctly. ([#146](https://github.com/Shopify/javascript/pull/146))

### Fixed
- Fixed an incorrect path in `esify` that caused the transformations to fail.

## [12.0.1] - 2016-05-27
### Changed
- Updated `spaced-comment` ESLint rule to allow for `=` immediately after comments (used in Sprockets directives). ([#144](https://github.com/Shopify/javascript/pull/144))

## [12.0.0] - 2016-05-27
### Added
- Added a `global-identifier-to-import` transform to import any global from a user-provided list used in a module. ([#90](https://github.com/Shopify/javascript/pull/90))
- Added a `remove-trailing-else-undefined-return` transform to remove useless trailing alternate returns. ([#91](https://github.com/Shopify/javascript/pull/91))
- Added a `convert-default-export-objects-to-named-exports`. ([#129](https://github.com/Shopify/javascript/pull/129))
- Updated ESLint and all plugins for `eslint-plugin-shopify`, which added the following rules (in addition to many fixes): `ava/assertion-arguments`, `babel/flow-object-type`, `import/no-extraneous-dependencies`, `import/no-mutable-exports`, `import/no-nodejs-modules`, `import/extensions`, `import/order`, `import/newline-after-import`, `import/prefer-default-export`, `lodash/consistent-compose`, `no-unsafe-finally`, and `react/jsx-no-target-blank`. ([#93](https://github.com/Shopify/javascript/pull/93))
- `esify` now accepts multiple files or glob patterns for conversion. ([#89](https://github.com/Shopify/javascript/pull/89))
- Added `rename-identifier` and `rename-property` transforms to make it easy to transition between aliased names. ([#139](https://github.com/Shopify/javascript/pull/139))
- Added a `computed-literal-keys-to-dot-notation` transform to correct any linting errors related to `dot-notation`. ([#141](https://github.com/Shopify/javascript/pull/141))

### Changed
- Reorganized transforms to catch more issues. ([#90](https://github.com/Shopify/javascript/pull/90))
- `remove-useless-return-from-test` transform now also removes trailing IIFEs. ([#90](https://github.com/Shopify/javascript/pull/90))
- Changed `object-shorthand` linting rule to `warn` (was `off`), except in cases where the keys of objects require quotes. ([#93](https://github.com/Shopify/javascript/pull/93))
- Changed `object-shorthand` linting rule to `warn` (was `off`) when single-line object literals have spaces inside the curly braces. ([#93](https://github.com/Shopify/javascript/pull/93))
- `global-reference-to-import` transform now avoids importing the file itself when using the global name of the exported object. It also uses a global cache for lookups, which increases the speed of transformations for large groups of files. ([#131](https://github.com/Shopify/javascript/pull/131))

### Fixed
- `function-to-arrow` now correctly removes blocks from single-return arrow function expressions. ([#136](https://github.com/Shopify/javascript/pull/136))
- `mocha-context-to-closure` now avoids transforming context assignments that are computed rather than a literal. ([#128](https://github.com/Shopify/javascript/pull/128))
- Fixed some jQuery reference detection edge cases for the `jquery-dollar-sign-reference` linting rule. ([#142](https://github.com/Shopify/javascript/pull/142))
- Fixed some additional existential/ soak operator edge cases for the `coffeescript-soak-to-condition` transform. ([#135](https://github.com/Shopify/javascript/pull/135))

### Removed
- Removed `generator-eslint-shopify`. ([#93](https://github.com/Shopify/javascript/pull/93))

### Build
- Updated all development dependencies. ([#93](https://github.com/Shopify/javascript/pull/93))
- Added scripts for generating new transforms and renaming existing transforms. ([#130](https://github.com/Shopify/javascript/pull/130))
- Improved the process and quality of this document ([#140](https://github.com/Shopify/javascript/pull/140))

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
