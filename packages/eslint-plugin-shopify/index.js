module.exports = {
  rules: {
    'require-flow': require('./lib/rules/require-flow'),
    'binary-assignment-parens': require('./lib/rules/binary-assignment-parens'),
    'prefer-early-return': require('./lib/rules/prefer-early-return'),
    'jquery-dollar-sign-reference': require('./lib/rules/jquery-dollar-sign-reference'),
  },

  configs: {
    core: require('./lib/config/core'),
    es5: require('./lib/config/es5'),
    esnext: require('./lib/config/esnext'),
    react: require('./lib/config/react'),
  },
};
