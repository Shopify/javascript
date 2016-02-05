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
        '.eslintrc',
        '.eslintignore',
        'package.json',
        'test/.eslintrc',
      ]);
    });

    it('sets the Shopify config and plugin', () => {
      assert.jsonFileContent('.eslintrc', {
        extends: 'shopify',
        plugins: ['shopify'],
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
      assert.jsonFileContent('.eslintrc', {
        extends: 'shopify/react',
        plugins: ['shopify', 'react'],
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
      assert.jsonFileContent('.eslintrc', {
        extends: 'shopify/es5',
      });
    });
  });
});
