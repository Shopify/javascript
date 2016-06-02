var proc = require('child_process');
var path = require('path');
var fs = require('fs');

module.exports = function runESLint(details) {
  return new Promise(function(resolve) {
    var eslint = findESLintBinary();
    if (eslint == null) { return; }
    proc.exec(eslint + ' ' + details.file + ' --fix', resolve);
  });
};

function findESLintBinary() {
  var possibleBinary = path.join(proc.execSync('npm bin').toString().trim(), 'eslint');
  return fs.statSync(possibleBinary).isFile() ? possibleBinary : null;
}
