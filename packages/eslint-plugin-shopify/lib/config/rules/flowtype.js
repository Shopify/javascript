// see https://github.com/gajus/eslint-plugin-flowtype

module.exports = {
  // Requires that all function parameters have type annotations.
  'flowtype/require-parameter-type': 'warn',
  // Requires that functions have return type annotation.
  'flowtype/require-return-type': ['always', {annotateUndefined: 'never'}],
  // Enforces consistent spacing after the type annotation colon.
  'flowtype/space-after-type-colon': 'always',
  // Enforces consistent spacing before the type annotation colon.
  'flowtype/space-before-type-colon': 'never',
  // Enforces a consistent naming pattern for type aliases.
  'flowtype/type-id-match': ['warn', '^([A-Z][a-z0-9]+)+Type$'],
};
