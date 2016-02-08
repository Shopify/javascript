module.exports = {
  extends: 'shopify/core',
  parser: 'babel-eslint',

  env: {
    es6: true,
    node: true,
  },

  ecmaFeatures: {
    modules: true,
  },

  rules: Object.assign(
    {},
    require('../rules/ecmascript-6'),
    {'no-param-reassign': 0} // because of default params
  ),
};
