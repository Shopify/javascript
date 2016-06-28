module.exports = {
  rules: {
    'binary-assignment-parens': require('./lib/rules/binary-assignment-parens'),
    'class-property-semi': require('./lib/rules/class-property-semi'),
    'jquery-dollar-sign-reference': require('./lib/rules/jquery-dollar-sign-reference'),
    'no-useless-computed-properties': require('./lib/rules/no-useless-computed-properties'),
    'no-fully-static-classes': require('./lib/rules/no-fully-static-classes'),
    'prefer-class-properties': require('./lib/rules/prefer-class-properties'),
    'prefer-early-return': require('./lib/rules/prefer-early-return'),
    'prefer-twine': require('./lib/rules/prefer-twine'),
    'require-flow': require('./lib/rules/require-flow'),
    'restrict-full-import': require('./lib/rules/restrict-full-import'),
    'sinon-no-restricted-features': require('./lib/rules/sinon-no-restricted-features'),
    'sinon-prefer-meaningful-assertions': require('./lib/rules/sinon-prefer-meaningful-assertions'),
  },

  configs: {
    ava: require('./lib/config/ava'),
    core: require('./lib/config/core'),
    es5: require('./lib/config/es5'),
    esnext: require('./lib/config/esnext'),
    flow: require('./lib/config/flow'),
    jquery: require('./lib/config/jquery'),
    lodash: require('./lib/config/lodash'),
    mocha: require('./lib/config/mocha'),
    node: require('./lib/config/node'),
    react: require('./lib/config/react'),
  },
};
