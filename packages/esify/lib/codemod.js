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
  // Must appear after constant-function-expression-to-statement in order to remove
  // unneeded semicolons from exported function declarations
  {path: 'shopify-codemod/transforms/remove-empty-statements'},
];

function runTransform(code, name, options) {
  var module = require(name);
  if (module.__esModule) { module = module.default; }

  var newCode = module({path: null, source: code}, {jscodeshift: jscodeshift}, options);
  return newCode == null ? code : newCode;
}

module.exports = function transform(details) {
  var source = details.source;
  var options = details.options;
  var testTransforms = (details.file.indexOf('test') >= 0);

  TRANSFORMS.forEach(function(transformer) {
    if (transformer.test == null || transformer.test === testTransforms) {
      source = runTransform(source, transformer.path, options);
    }
  });

  return source;
};
