module.exports = {
  extends: 'shopify/es6',

  plugins: [
    'react',
    'shopify',
  ],

  ecmaFeatures: {
    jsx: true,
  },

  globals: {
    fetch: true,
    ReactElement: true,
    ReactClass: true,
  },

  rules: require('../rules/react'),
};
