import fs from 'fs';
import path from 'path';
import chai, {expect} from 'chai';
import jscodeshift from 'jscodeshift';

const config = {
  fixtureDirectory: process.cwd(),
  inputFixturePath(fixture) {
    return path.join(this.fixtureDirectory, `${fixture}.input.js`);
  },
  outputFixturePath(fixture) {
    return path.join(this.fixtureDirectory, `${fixture}.output.js`);
  },
  transformOptions: {},
};

function jscodeshiftChai(options) {
  const finalConfig = {...config, ...options};

  // eslint-disable-next-line no-shadow
  return function jscodeshiftChai({Assertion, assert}) {
    function transform(fixture, transformOptions = {}) {
      const {_obj: transformer} = this;

      const inputPath = finalConfig.inputFixturePath(fixture);
      const outputPath = finalConfig.outputFixturePath(fixture);

      const input = fs.readFileSync(inputPath, 'utf8');
      const output = fs.readFileSync(outputPath, 'utf8').trim();
      const transformed = transformer(
        {source: input, path: inputPath},
        {jscodeshift},
        {...finalConfig.transformOptions, ...transformOptions}
      ).trim();

      new Assertion(transformed).to.equal(output);
    }

    Assertion.addMethod('transform', transform);

    assert.transforms = function(transformer, fixture, transformerOptions = {}) {
      return (new Assertion(transformer)).transforms(fixture, transformerOptions);
    };
  };
}

chai.use(jscodeshiftChai({
  fixtureDirectory: path.join(__dirname, 'fixtures'),
  transformOptions: {
    printOptions: {quote: 'single'},
  },
}));

global.expect = expect;
