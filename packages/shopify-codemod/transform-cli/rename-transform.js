/* eslint-disable no-sync */
const fs = require('fs');
const utils = require('./transform-management-utils');

module.exports = function renameTransform(oldName, newName) {
  if (!oldName) {
    throw new Error('Specify the transform\'s current dasherized name as an argument.');
  }

  if (!newName) {
    throw new Error('Specify the transform\'s new dasherized name as an argument.');
  }

  utils.validateTransformName(newName);

  const oldInfo = utils.transformNameInfo(oldName);
  const newInfo = utils.transformNameInfo(newName);

  fs.renameSync(oldInfo.transformFilePath, newInfo.transformFilePath);
  fs.renameSync(oldInfo.testSuiteFilePath, newInfo.testSuiteFilePath);
  fs.renameSync(oldInfo.fixtureDir, newInfo.fixtureDir);

  const transformJS = fs
    .readFileSync(newInfo.transformFilePath, 'utf8')
    .replace(new RegExp(oldInfo.camelizedName, 'g'), newInfo.camelizedName);
  fs.writeFileSync(newInfo.transformFilePath, transformJS);

  const testSuiteJS = fs
    .readFileSync(newInfo.testSuiteFilePath, 'utf8')
    .replace(new RegExp(oldInfo.dasherizedName, 'g'), newInfo.dasherizedName)
    .replace(new RegExp(oldInfo.camelizedName, 'g'), newInfo.camelizedName);
  fs.writeFileSync(newInfo.testSuiteFilePath, testSuiteJS);
};
