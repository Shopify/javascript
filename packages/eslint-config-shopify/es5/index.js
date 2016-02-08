module.exports = {
  extends: 'shopify/core',

  env: {
    node: true,
  },

  rules: Object.assign(
    {},
    require('../rules/node'),
    {'shopify/require-flow': 0}
  ),
};
