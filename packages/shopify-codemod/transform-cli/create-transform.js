/* eslint-disable no-sync */
const fs = require('fs');
const path = require('path');
const utils = require('./transform-management-utils');

function createFileSync(filePath, content) {
  fs.writeFileSync(filePath, content);
}

function readTemplateSync(name) {
  return fs.readFileSync(path.join('transform-cli', 'templates', name), 'utf8');
}

function generateTransformJS({camelizedName}) {
  return readTemplateSync('transform.js.template')
    .replace(/__CAMELIZED_NAME__/g, camelizedName);
}

function generateTestSuiteJS({dasherizedName, camelizedName}) {
  return readTemplateSync('test-suite.js.template')
    .replace(/__DASHERIZED_NAME__/g, dasherizedName)
    .replace(/__CAMELIZED_NAME__/g, camelizedName);
}

module.exports = function createTransform(dasherizedName) {
  if (!dasherizedName) {
    throw new Error('Specify the transform\'s dasherized name as an argument.');
  }

  utils.validateTransformName(dasherizedName);
  const transformInfo = utils.transformNameInfo(dasherizedName);
  const {transformFilePath, testSuiteFilePath, fixtureDir} = transformInfo;

  fs.writeFileSync(transformFilePath, generateTransformJS(transformInfo));
  fs.writeFileSync(testSuiteFilePath, generateTestSuiteJS(transformInfo));

  fs.mkdirSync(fixtureDir);

  createFileSync(path.join(fixtureDir, 'basic.input.js'), '');
  createFileSync(path.join(fixtureDir, 'basic.output.js'), '');
};
