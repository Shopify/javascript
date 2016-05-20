// see https://github.com/wix/eslint-plugin-lodash

module.exports = {
  // Possible errors

  // Use or avoid thisArg for Lodash method callbacks, depending on major version.
  'lodash/callback-binding': 'error',
  // Use value returned from collection methods properly.
  'lodash/collection-method-value': 'warn',
  // Always return a value in iteratees of Lodash collection methods that aren't forEach.
  'lodash/collection-return': 'error',
  // Do not use .value() on chains that have already ended (e.g. with max() or reduce()) (fixable)
  'lodash/no-double-unwrap': 'error',
  // Do not use superfluous arguments on Lodash methods with a specified arity.
  'lodash/no-extra-args': 'error',
  // Prevent chaining without evaluation via value() or non-chainable methods like max().
  'lodash/unwrap': 'error',

  // Stylistic issues

  // Enforce a specific chain style: explicit, implicit, or explicit only when necessary.
  'lodash/chain-style': ['warn', 'explicit'],
  // Enforce a specific function composition direction: `flow` or `flowRight`.
  'lodash/consistent-compose': ['warn', 'flow'],
  // Prefer identity shorthand syntax
  'lodash/identity-shorthand': ['warn', 'never'],
  // Prefer matches property shorthand syntax
  'lodash/matches-prop-shorthand': ['warn', 'never'],
  // Prefer matches shorthand syntax
  'lodash/matches-shorthand': ['warn', 'always', 3, true],
  // Do not use .commit() on chains that should end with .value()
  'lodash/no-commit': 'warn',
  // Prevent chaining syntax for single method, e.g. _(x).map().value()
  'lodash/no-single-chain': 'warn',
  // Enforce a specific path style for methods like get and property: array, string, or arrays only for deep paths.
  'lodash/path-style': ['warn', 'string'],
  // Prefer a Lodash chain over nested Lodash calls
  'lodash/prefer-chain': 'warn',
  // Prefer _.compact over _.filter for only truthy values.
  'lodash/prefer-compact': 'warn',
  // Prefer _.filter over _.forEach with an if statement inside.
  'lodash/prefer-filter': 'warn',
  // Prefer _.flatMap over consecutive map and flatten.
  'lodash/prefer-flat-map': 'warn',
  // Prefer using _.invoke over _.map with a method call inside.
  'lodash/prefer-invoke-map': 'off',
  // Prefer _.map over _.forEach with a push inside.
  'lodash/prefer-map': 'error',
  // Prefer _.reject over filter with !(expression) or x.prop1 !== value
  'lodash/prefer-reject': 'warn',
  // Prefer using _.prototype.thru in the chain and not call functions in the initial value, e.g. _(x).thru(f).map(g)...
  'lodash/prefer-thru': 'off',
  // Prefer using array and string methods in the chain and not the initial value, e.g. _(str).split(' ')...
  'lodash/prefer-wrapper-method': 'off',
  // Prefer using main method names instead of aliases. (fixable)
  'lodash/preferred-alias': 'warn',
  // Use/forbid property shorthand syntax.
  'lodash/prop-shorthand': ['warn', 'never'],

  // Preference over native

  // Prefer _.constant over functions returning literals.
  'lodash/prefer-constant': 'off',
  // Prefer using _.get or _.has over expression chains like a && a.b && a.b.c.
  'lodash/prefer-get': 'warn',
  // Prefer _.includes over comparing indexOf to -1.
  'lodash/prefer-includes': 'off',
  // Prefer _.isNil over checks for both null and undefined.
  'lodash/prefer-is-nil': 'off',
  // Prefer using Lodash chains (e.g. _.map) over native and mixed chains.
  'lodash/prefer-lodash-chain': 'off',
  // Prefer using Lodash collection methods (e.g. _.map) over native array methods.
  'lodash/prefer-lodash-method': 'off',
  // Prefer using _.is* methods over typeof and instanceof checks when applicable.
  'lodash/prefer-lodash-typecheck': 'off',
  // Prefer _.matches over conditions like a.foo === 1 && a.bar === 2 && a.baz === 3.
  'lodash/prefer-matches': 'off',
  // Prefer _.noop over empty functions.
  'lodash/prefer-noop': 'off',
  // Prefer _.overSome and _.overEvery instead of checks with && and || for methods that have a boolean check iteratee.
  'lodash/prefer-over-quantifier': 'off',
  // Prefer _.startsWith over a.indexOf(b) === 0.
  'lodash/prefer-startswith': 'off',
  // Prefer _.times over _.map without using the iteratee's arguments.
  'lodash/prefer-times': 'off',
};
