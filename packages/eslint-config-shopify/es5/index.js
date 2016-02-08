var merge = require('merge');

module.exports = {
  extends: 'shopify/core',

  env: {
    node: true,
  },

  rules: merge(
    require('../rules/node'),
    {'shopify/require-flow': 0}
  ),
};
