var exec = require('child_process').exec;
var path = require('path');
var fs = require('fs');

module.exports = function runESLint(details) {
  return new Promise(function(resolve) {
    var eslint = findESLintBinary();
    if (eslint == null) { return; }
    exec(eslint + ' ' + details.file + ' --fix', resolve);
  });
};

function findESLintBinary() {
  var possibleBinary = path.join(process.cwd(), 'node_modules/.bin/eslint');
  return fs.statSync(possibleBinary).isFile() ? possibleBinary : null;
}
