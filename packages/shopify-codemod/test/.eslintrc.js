module.exports = {
  extends: 'plugin:shopify/mocha',

  globals: {
    expect: false,
  },

  rules: {
    'no-unused-expressions': 'off',
    'import/no-unresolved': 'off',
  },
};
