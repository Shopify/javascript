/* eslint-disable no-sync */
const path = require('path');

function camelize(str) {
  return str.replace(/-[a-z]/g, (dashWithLetter) => dashWithLetter[1].toUpperCase());
}

module.exports.validateTransformName = function(dasherizedName) {
  if (/[A-Z_0-9]/.test(dasherizedName)) {
    throw new Error('Transform names must contain only lower-case letters and hyphens.');
  }
};

module.exports.transformNameInfo = function(dasherizedName) {
  const transformFilePath = path.join('transforms', `${dasherizedName}.js`);
  const testSuiteFilePath = path.join('test', 'transforms', `${dasherizedName}.test.js`);
  const documentationFilePath = path.join('docs', `${dasherizedName}.md`);
  const fixtureDir = path.join('test', 'fixtures', dasherizedName);

  return {
    dasherizedName,
    camelizedName: camelize(dasherizedName),
    transformFilePath,
    testSuiteFilePath,
    documentationFilePath,
    fixtureDir,
  };
};
