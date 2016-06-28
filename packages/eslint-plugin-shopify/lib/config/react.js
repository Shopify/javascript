var merge = require('merge');

module.exports = {
  extends: 'plugin:shopify/esnext',

  env: {
    browser: true,
  },

  parserOptions: {
    ecmaFeatures: {jsx: true},
  },

  globals: {
    fetch: true,
    ReactElement: true,
    ReactClass: true,
  },

  plugins: [
    'react',
    'jsx-a11y',
  ],

  rules: merge(
    require('./rules/react'),
    require('./rules/jsx-a11y')
  ),
};
