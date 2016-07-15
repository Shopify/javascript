var merge = require('merge');

module.exports = {
  parser: 'babel-eslint',

  env: {
    es6: true,
    node: true,
    mocha: true,
    jquery: true,
  },

  parserOptions: {
    ecmaVersion: 7,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
      experimentalObjectRestSpread: true,
    },
  },

  plugins: [
    'ava',
    'babel',
    'chai-expect',
    'flowtype',
    'import',
    'jsx-a11y',
    'lodash',
    'node',
    'promise',
    'react',
    'shopify',
    'sort-class-members',
  ],

  rules: merge(
    require('./rules/best-practices'),
    require('./rules/ecmascript-6'),
    require('./rules/legacy'),
    require('./rules/possible-errors'),
    require('./rules/shopify'),
    require('./rules/strict-mode'),
    require('./rules/stylistic-issues'),
    require('./rules/variables'),

    require('./rules/ava'),
    require('./rules/babel'),
    require('./rules/chai-expect'),
    require('./rules/flowtype'),
    require('./rules/import'),
    require('./rules/jsx-a11y'),
    require('./rules/lodash'),
    require('./rules/node'),
    require('./rules/promise'),
    require('./rules/react'),
    require('./rules/shopify'),
    require('./rules/sort-class-members')
  ),
};
