var decaf = require('shopify-decaf');
var chalk = require('chalk');

function warn(message) {
  console.log(chalk.yellow('[warning]') + ' ' + message);
}

function error(message) {
  console.log(chalk.red('[error]') + ' ' + message);
  throw new Error();
}

var WARNING_CHECKS = [
  function checkForComments(source) {
    if (/#[^={]/.test(source)) {
      warn('Your file contains comments. Unfortunately, the CoffeeScript compiler does not expose these comments. Make sure to copy over any important comments to the appropriate place in your new JavaScript file');
    }
  },
  function checkForSprocketsDirective(source) {
    if (/#=/.test(source)) {
      warn('Your file contains Sprockets directives. If these directives are requiring additional files, you must translate them into `import` statements if this command failed to do so automatically. Other directives will need to be copied over to the new JavaScript file.');
    }
  },
  function checkForGlobalClass(source) {
    var match = source.match(/class\s((?:@|this\.)\w+)/);
    if (match) {
      warn('Your file contains a class exposed to `window` using the form `' + match[1] + '`. These are not supported by `esify` and will not do what you expect when bundled with Sprockets commoner. Expose this to some other global namespace before trying again.');
    }
  },
  function checkForMultilineStrings(source) {
    if (/"""/.test(source)) {
      warn('Your file contains multiline strings. These get compiled down to a single-line string with spaces added; you may want to update the formatting to use an ES6 multiline string instead.');
    }
  },
  function checkForInterpolatedKeys(source) {
    if (/"[^"]*#{[^}]*}[^"]*":/.test(source)) {
      error('Your file contains an interpolated object key, which are not currently converted by esify. Please convert these to two statements (one to set up the object, the other to use bracket notation to assign the interpolated key) before trying again.');
    }
  },
];

module.exports = function transform(details) {
  var source = details.source;
  var options = details.options;

  WARNING_CHECKS.forEach(function(warningCheck) { warningCheck(source); });

  return decaf.compile(source, options.printOptions);
};
