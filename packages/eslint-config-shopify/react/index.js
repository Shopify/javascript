var merge = require('merge');
var es6Config = require('../es6');

module.exports = {
  extends: 'shopify/es6',

  plugins: [
    'react',
    'shopify',
  ],

  parserOptions: merge.recursive(
    es6Config.parserOptions,
    {
      ecmaFeatures: {jsx: true},
    }
  ),

  globals: {
    fetch: true,
    ReactElement: true,
    ReactClass: true,
  },

  rules: require('../rules/react'),
};
