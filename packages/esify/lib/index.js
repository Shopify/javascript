var fs = require('fs');
var glob = require('glob');
var path = require('path');

var loadConfig = require('./config');
var runDecaf = require('./decaf');
var runCodemods = require('./codemod');
var runESLint = require('./eslint');

var patterns = process.argv.slice(2);
var files = getFiles(patterns);
var errors = {};
var config = loadConfig();

if (files.length === 0) {
  throw new Error('No .coffee files found for "' + process.argv[2] + '".');
}

files.forEach(handleFile);

var errorKeys = Object.keys(errors);

if (errorKeys.length > 0) {
  console.log();
  console.log('Errors:');

  errorKeys.forEach(function(error) {
    console.log('\t' + error);

    errors[error].forEach(function(filePath) {
      console.log('\t\t' + filePath);
    });
  });
}

function getFiles(filePatterns) {
  if (filePatterns == null || filePatterns.length === 0) {
    throw new Error('Pass in .coffee files, or glob patterns.');
  }

  return filePatterns.reduce(function(result, filePattern) {
    return result.concat(
      glob
        .sync(filePattern, {ignore: ['node_modules/**', 'vendor/**']})
        .filter(function(filePath) { return filePath.match(/\.coffee$/); })
    );
  }, []);
}

function handleFile(filePath) {
  var source = fs.readFileSync(filePath, {encoding: 'utf8'});
  try {
    var decaffed = runDecaf({source: source, file: filePath, options: config});
    var codemoded = runCodemods({source: decaffed, file: filePath, options: config});
    var linted = runESLint({source: codemoded, file: filePath, options: config});

    var newFile = path.join(
      path.dirname(filePath),
      path.basename(filePath, '.coffee').replace(/_/g, '-') + '.js'
    );

    fs.writeFileSync(newFile, linted);
    console.log(filePath + ' => ' + newFile);
  } catch (error) {
    handleError(filePath, error);
  }
}

function handleError(filePath, error) {
  var errorType;
  var errorLocation;
  var errorInfo = error.message.match(/^(.+) (\(.+?\))$/);

  if (errorInfo) {
    errorType = errorInfo[1];
    errorLocation = errorInfo[2];
  } else {
    errorType = error.message;
    errorLocation = '';
  }

  errors[errorType] = errors[errorType] || [];
  errors[errorType].push(filePath + ' ' + errorLocation);

  console.error(filePath);
  console.error(error.stack);
}
