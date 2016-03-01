import '../../helper';

import path from 'path';
import assert from 'yeoman-assert';
import helpers from 'yeoman-test';

describe('generator-eslint-shopify:app', () => {
  const generatorIndex = path.join(__dirname, '../../../src/app');

  describe('defaults', () => {
    beforeEach((done) => {
      helpers
        .run(generatorIndex)
        .on('end', done);
    });

    it('creates the required files', () => {
      assert.file([
        '.eslintignore',
        'package.json',
      ]);
    });

    it('sets the Shopify config', () => {
      assert.jsonFileContent('package.json', {
        eslintConfig: {extends: 'plugin:shopify/esnext'},
      });
    });
  });

  describe('--react', () => {
    beforeEach((done) => {
      helpers
        .run(generatorIndex)
        .withPrompts({react: true})
        .on('end', done);
    });

    it('sets the React Shopify config and plugin', () => {
      assert.jsonFileContent('package.json', {
        eslintConfig: {extends: 'plugin:shopify/react'},
      });
    });
  });

  describe('--es5', () => {
    beforeEach((done) => {
      helpers
        .run(generatorIndex)
        .withPrompts({es5: true})
        .on('end', done);
    });

    it('sets the ES5 Shopify config', () => {
      assert.jsonFileContent('package.json', {
        eslintConfig: {extends: 'plugin:shopify/es5'},
      });
    });
  });
});
