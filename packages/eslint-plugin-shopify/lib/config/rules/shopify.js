module.exports = {
  // Requires (or disallows) @flow declarations be present at the top of each file.
  'shopify/require-flow': 'off',
  // Requires (or disallows) assignments of binary, boolean-producing expressions to be wrapped in parentheses.
  'shopify/binary-assignment-parens': ['warn', 'always'],
  // Prefer early returns over full-body conditional wrapping in function declarations.
  'shopify/prefer-early-return': ['warn', {maximumStatements: 1}],
  // Requires that all jQuery objects are assigned to references prefixed with `$`.
  'shopify/jquery-dollar-sign-reference': 'warn',
  // Requires (or disallows) semicolons for class properties.
  'shopify/class-property-semi': 'warn',
  // Prevents the usage of unnecessary computed properties.
  'shopify/no-useless-computed-properties': 'error',
  // Prevents importing the entirety of a package.
  'shopify/restrict-full-import': 'off',
  // Restricts the use of specified sinon features.
  'shopify/sinon-no-restricted-features': 'off',
};
