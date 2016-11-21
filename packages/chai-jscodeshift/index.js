var fs = require('fs');
var path = require('path');
var merge = require('merge');
var jscodeshift = require('jscodeshift');

var config = {
  fixtureDirectory: process.cwd(),
  inputFixturePath: function(fixture, fixtureDirectory) {
    return path.join(fixtureDirectory, fixture + '.input.js');
  },
  outputFixturePath: function(fixture, fixtureDirectory) {
    return path.join(fixtureDirectory, fixture + '.output.js');
  },
  transformOptions: {},
};

module.exports = function chaiJSCodeShift(options) {
  var finalConfig = merge({}, config, options || {});

  // eslint-disable-next-line no-shadow, func-style, func-name-matching
  var chaiHelper = function chaiJSCodeShift(chaiOptions) {
    var Assertion = chaiOptions.Assertion;
    var assert = chaiOptions.assert;

    function transformFixtureWithOptions(transformer, fixture, transformOptions) {
      var inputPath = finalConfig.inputFixturePath(fixture, finalConfig.fixtureDirectory);

      var input = fs.readFileSync(inputPath, 'utf8');
      return transformer(
        {source: input, path: inputPath},
        {jscodeshift: jscodeshift},
        merge({}, finalConfig.transformOptions, transformOptions || {})
      ).trim();
    }

    function transform(fixture, transformOptions) {
      var outputPath = finalConfig.outputFixturePath(fixture, finalConfig.fixtureDirectory);
      var output = fs.readFileSync(outputPath, 'utf8').trim();
      var transformed = transformFixtureWithOptions(this._obj, fixture, transformOptions);
      new Assertion(transformed).to.equal(output);
    }

    function throwWhileTransforming(fixture, error, transformOptions) {
      var transformer = this._obj;
      new Assertion(function() { transformFixtureWithOptions(transformer, fixture, transformOptions); }).to.throw(error);
    }

    Assertion.addMethod('transform', transform);
    Assertion.addMethod('throwWhileTransforming', throwWhileTransforming);

    assert.transforms = function(transformer, fixture, transformerOptions) {
      return (new Assertion(transformer)).to.transform(fixture, transformerOptions || {});
    };

    assert.throwsWhileTransforming = function(transformer, fixture, error, transformerOptions) {
      return (new Assertion(transformer)).to.throwWhileTransforming(fixture, error, transformerOptions);
    };
  };

  // Utilities to be able to actually test this
  chaiHelper.resetConfig = function resetConfig() {
    finalConfig = config;
  };

  chaiHelper.updateConfig = function updateConfig(newConfig) {
    finalConfig = merge({}, finalConfig, newConfig);
  };

  return chaiHelper;
};
