module.exports = {
  extends: [
    'plugin:shopify/esnext',
    'plugin:shopify/mocha',
  ],

  globals: {
    expect: false,
    assert: false,
    sinon: false,
  },

  rules: {
    'no-unused-expressions': 'off',
    'newline-per-chained-call': 'off',
    'import/no-extraneous-dependencies': 'off',
  },
};
