module.exports = {
  // Requires (or disallows) @flow declarations be present at the top of each file.
  'shopify/require-flow': 'off',
  // Requires (or disallows) assignments of binary, boolean-producing expressions to be wrapped in parentheses.
  'shopify/binary-assignment-parens': ['warn', 'always'],
  // Prefer early returns over full-body conditional wrapping in function declarations.
  'shopify/prefer-early-return': ['warn', {maximumStatements: 1}],
};
