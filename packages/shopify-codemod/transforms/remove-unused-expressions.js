// This transform mostly mirrors the no-unused-expression ESLint rule:
// https://github.com/eslint/eslint/blob/master/lib/rules/no-unused-expressions.js

import {isDirective} from './utils';
import {warn} from './console-utils';

export default function removeUnusedExpressions({path, source}, {jscodeshift: j}, {printOptions = {quote: 'single'}}) {
  const validUnaryOperators = new Set(['delete', 'void']);
  function isValidUnaryExpression({node: {expression: {type, operator}}}) {
    return type === 'UnaryExpression' && validUnaryOperators.has(operator);
  }

  function isValidExpression(expressionPath) {
    const type = expressionPath.get('expression', 'type').value;
    return (
      /^(?:Assignment|Call|New|Update|Yield)Expression$/.test(type) ||
      isValidUnaryExpression(expressionPath) ||
      isDirective(expressionPath)
    );
  }

  function isUnusedExpression(expressionPath) {
    return !isValidExpression(expressionPath);
  }

  function warnRemove(expressionPath) {
    warn('Removing unused expression:', path, expressionPath, source);
  }

  return j(source)
    .find(j.ExpressionStatement)
    .filter(isUnusedExpression)
    .forEach(warnRemove)
    .replaceWith()
    .toSource(printOptions);
}
