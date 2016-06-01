var path = require('path');
var decaf = require('shopify-decaf');
var chalk = require('chalk');
var jscodeshift = require('jscodeshift');

require('babel-register')({ignore: false});

var TRANSFORMS = [
  {path: 'shopify-codemod/transforms/coffeescript-soak-to-condition'},
  {path: 'shopify-codemod/transforms/ternary-statement-to-if-statement'},
  {path: 'shopify-codemod/transforms/remove-useless-return-from-test', test: true},
  {path: 'shopify-codemod/transforms/mocha-context-to-global-reference', test: true},
  {path: 'shopify-codemod/transforms/mocha-context-to-closure', test: true},
  {path: 'shopify-codemod/transforms/coffeescript-range-output-to-helper'},
  {path: 'shopify-codemod/transforms/remove-addeventlistener-returns'},
  {path: 'shopify-codemod/transforms/conditional-assign-to-if-statement'},
  // This transform must appear before the constant-function-expression-to-statement and
  // object-shorthand transforms in order to catch the most empty functions possible. It
  // must also go before global-identifier-to-import so that lodash is correctly imported.
  {path: 'shopify-codemod/transforms/empty-func-to-lodash-noop'},
  {path: 'shopify-codemod/transforms/global-assignment-to-default-export', test: false},
  {path: 'shopify-codemod/transforms/convert-default-export-objects-to-named-exports', test: false},
  {path: 'shopify-codemod/transforms/add-missing-parseint-radix'},
  {path: 'shopify-codemod/transforms/implicit-coercion-to-explicit'},
  // Order is significant for these initial assert transforms; think carefully before reordering.
  {path: 'shopify-codemod/transforms/assert/assert-false-to-assert-fail', test: true},
  {path: 'shopify-codemod/transforms/assert/assert-to-assert-ok', test: true},
  {path: 'shopify-codemod/transforms/assert/negated-assert-ok-to-assert-not-ok', test: true},
  {path: 'shopify-codemod/transforms/assert/move-literals-to-expected-argument', test: true},
  {path: 'shopify-codemod/transforms/assert/equality-comparisons-to-assertions', test: true},
  // These transforms can be executed in any order.
  {path: 'shopify-codemod/transforms/assert/called-equals-boolean-to-assert-called', test: true},
  {path: 'shopify-codemod/transforms/assert/call-count-equals-to-assert-called', test: true},
  {path: 'shopify-codemod/transforms/assert/called-method-to-assert-called', test: true},
  {path: 'shopify-codemod/transforms/assert/called-with-methods-to-assert-called-with', test: true},
  {path: 'shopify-codemod/transforms/assert/falsy-called-method-to-assert-not-called', test: true},
  // These are more generic, stylistic transforms, so they should come last to catch any
  // new nodes introduced by other transforms
  {path: 'shopify-codemod/transforms/remove-trailing-else-undefined-return'},
  {path: 'shopify-codemod/transforms/remove-empty-returns'},
  {path: 'shopify-codemod/transforms/function-to-arrow'},
  {path: 'js-codemod/transforms/arrow-function'},
  {path: 'js-codemod/transforms/template-literals'},
  {path: 'shopify-codemod/transforms/strip-template-literal-parenthesis'},
  {path: 'js-codemod/transforms/object-shorthand'},
  // These are run very late to ensure they catch any identifiers/ member expressions
  // added in earlier transforms
  {path: 'js-codemod/transforms/unquote-properties'},
  {path: 'shopify-codemod/transforms/computed-literal-keys-to-dot-notation'},
  {path: 'shopify-codemod/transforms/rename-identifier'},
  {path: 'shopify-codemod/transforms/rename-property'},
  // constant-function-expression-to-statement and global-reference-to-import need
  // `const` references, so they must happen after `no-vars`
  {path: 'js-codemod/transforms/no-vars'},
  {path: 'shopify-codemod/transforms/constant-function-expression-to-statement'},
  {path: 'shopify-codemod/transforms/global-reference-to-import'},
  {path: 'shopify-codemod/transforms/global-identifier-to-import'},
];

var OPTIONS = loadOptions();

function loadOptions() {
  try {
    return require(path.join(process.cwd(), 'esify.config'));
  } catch (error) {
    return {
      appGlobalIdentifiers: ['Shopify', 'Sello'],
      javascriptSourceLocation: path.join(process.cwd(), 'app/assets/javascripts'),
      printOptions: {
        quote: 'single',
        trailingComma: true,
        tabWidth: 2,
        wrapColumn: 1000,
      },
      testContextToGlobals: {
        testClock: {
          properties: ['clock'],
          replace: true,
        },
        sandbox: {
          properties: ['spy', 'stub', 'mock', 'server', 'requests'],
        },
      },
      globalIdentifiers: {
        _: 'lodash',
        $: 'jquery',
        moment: 'moment',
        jstz: 'jstimezonedetect',
        mousetrap: 'mousetrap',
        URI: 'urijs',
        URITemplate: 'urijs/src/URITemplate',
        ReconnectingWebSocket: 'shopify-reconnecting-websocket',
        d3: 'd3',
        NProgress: 'NProgress',
        FastClick: 'shopify-fastclick',
        Clipboard: 'clipboard',
      },
      renameIdentifiers: {
        jQuery: '$',
      },
      renameProperties: {
        _: {
          first: 'head',
          each: 'forEach',
          eachRight: 'forEachRight',
          entries: 'toPairs',
          entriesIn: 'toPairsIn',
          extend: 'assignIn',
          extendWith: 'assignInWith',
        },
      },
    };
  }
}

function runTransform(code, name) {
  var module = require(name);
  if (module.__esModule) { module = module.default; }

  var newCode = module({path: null, source: code}, {jscodeshift: jscodeshift}, OPTIONS);
  return newCode == null ? code : newCode;
}

function warn(message) {
  console.log(chalk.yellow('[warning]') + ' ' + message);
}

var WARNING_CHECKS = [
  function checkForComments(source) {
    if (/#[^=]/.test(source)) {
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
];

module.exports = function transform(source, options) {
  var testTransforms = options.testTransforms == null ? false : options.testTransforms;

  WARNING_CHECKS.forEach(function(warningCheck) { warningCheck(source); });

  var code = decaf.compile(source, OPTIONS.printOptions);

  TRANSFORMS.forEach(function(transformer) {
    if (transformer.test == null || transformer.test === testTransforms) {
      code = runTransform(code, transformer.path);
    }
  });
  return code;
};
