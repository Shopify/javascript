/* eslint no-sync: 0 */

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
  var finalConfig = merge(config, options || {});

  // eslint-disable-next-line no-shadow
  return function chaiJSCodeShift(chaiOptions) {
    var Assertion = chaiOptions.Assertion;
    var assert = chaiOptions.assert;

    function transform(fixture, transformOptions) {
      var transformer = this._obj;

      var inputPath = finalConfig.inputFixturePath(fixture, finalConfig.fixtureDirectory);
      var outputPath = finalConfig.outputFixturePath(fixture, finalConfig.fixtureDirectory);

      var input = fs.readFileSync(inputPath, 'utf8');
      var output = fs.readFileSync(outputPath, 'utf8').trim();
      var transformed = transformer(
        {source: input, path: inputPath},
        {jscodeshift: jscodeshift},
        merge(finalConfig.transformOptions, transformOptions || {})
      ).trim();

      new Assertion(transformed).to.equal(output);
    }

    Assertion.addMethod('transform', transform);

    assert.transforms = function(transformer, fixture, transformerOptions) {
      return (new Assertion(transformer)).transforms(fixture, transformerOptions || {});
    };
  };
};
