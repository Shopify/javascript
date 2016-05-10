function forceReprint({node}) {
  // Inspired by https://github.com/cpojer/js-codemod/blob/b627c7faaacbe3cbe48050aea70ebc9aa4684c9b/transforms/trailing-commas.js#L25-L27
  node.original = null;
}

export default function stripTemplateLiteralParenthesis({source}, {jscodeshift: j}, {printOptions = {}}) {
  return j(source)
    .find(j.TemplateLiteral)
    .map((path) => path.parentPath)
    // The jscode-shift AST doesn't capture parenthesis info; forcing a reprint will render the template string sans parens.
    .forEach(forceReprint)
    .toSource(printOptions);
}
