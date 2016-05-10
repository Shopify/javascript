var path = require('path');
var decaf = require('shopify-decaf');
var jscodeshift = require('jscodeshift');

require('babel-register')({ignore: false});

var TRANSFORMS = [
  {path: 'shopify-codemod/transforms/constant-function-expression-to-statement'},
  {path: 'shopify-codemod/transforms/ternary-statement-to-if-statement'},
  {path: 'shopify-codemod/transforms/mocha-context-to-closure', test: true},
  {path: 'shopify-codemod/transforms/mocha-context-to-global-reference', test: true},
  {path: 'shopify-codemod/transforms/coffeescript-range-output-to-helper'},
  {path: 'shopify-codemod/transforms/remove-useless-return-from-test', test: true},
  {path: 'shopify-codemod/transforms/conditional-assign-to-if-statement'},
  {path: 'shopify-codemod/transforms/function-to-arrow'},
  {path: 'shopify-codemod/transforms/global-assignment-to-default-export', test: false},
  {path: 'shopify-codemod/transforms/global-reference-to-import'},
  {path: 'js-codemod/transforms/arrow-function'},
  {path: 'js-codemod/transforms/template-literals'},
  {path: 'shopify-codemod/transforms/strip-template-literal-parenthesis'},
  {path: 'js-codemod/transforms/object-shorthand'},
  {path: 'js-codemod/transforms/no-vars'},
  {path: 'js-codemod/transforms/unquote-properties'},
];

var OPTIONS = {
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
};

function runTransform(code, name) {
  var module = require(name);
  if (module.__esModule) { module = module.default; }

  var newCode = module({path: null, source: code}, {jscodeshift: jscodeshift}, OPTIONS);
  return newCode == null ? code : newCode;
}

module.exports = function transform(source, options) {
  var testTransforms = options.testTransforms == null ? false : options.testTransforms;
  var code = decaf.compile(source, OPTIONS.printOptions);

  TRANSFORMS.forEach(function(transformer) {
    if (transformer.test == null || transformer.test === testTransforms) {
      code = runTransform(code, transformer.path);
    }
  });
  return code;
};
