module.exports = {
  extends: 'plugin:shopify/esnext',

  env: {
    mocha: true,
    es6: true,
  },

  globals: {
    expect: false,
    assert: false,
    sinon: false,
  },

  rules: {
    'no-unused-expressions': 0,
    'newline-per-chained-call': 0
  },
};
