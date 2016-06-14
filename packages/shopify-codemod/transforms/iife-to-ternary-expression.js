export default function iifeToTernaryExpression({source}, {jscodeshift: j}, {printOptions = {}}) {
  function isImmediatelyInvokedFunctionExpression(expressionPath) {
    let expression = expressionPath.node.expression
    return expression.type == 'CallExpression' && expression.callee.type == 'ArrowFunctionExpression'
  }

  function containsOnlyIfStatement(functionNode) {
    return nodeIsBlockStatementContainingOnly(functionNode.body, 'IfStatement');
  }

  function onlyReturnsOneOfTwoValues(ifStatementNode) {
    return nodeIsBlockStatementContainingOnly(ifStatementNode.consequent, 'ReturnStatement') &&
           nodeIsBlockStatementContainingOnly(ifStatementNode.alternate, 'ReturnStatement');
  }

  function nodeIsBlockStatementContainingOnly(node, childType) {
    return node.type == 'BlockStatement' &&
           node.body.length == 1 &&
         node.body[0].type == childType;
  }

  function isConvertibleExpression(path) {
    return isImmediatelyInvokedFunctionExpression(path) &&
           containsOnlyIfStatement(path.node.expression.callee) &&
           onlyReturnsOneOfTwoValues(path.node.expression.callee.body.body[0]);
  }

  const sourceAST = j(source);

  sourceAST
    .find(j.ExpressionStatement)
    .filter(isConvertibleExpression)
    .replaceWith(({node}) => {
      let {expression: {callee: {body: functionBlockStatement}}} = node;
    let {body: [{test,
                   consequent: {body: [{argument: consequentIdentifier}]},
                   alternate: {body: [{argument: alternateIdentifier}]}
                  }]} = functionBlockStatement;

      let ternaryExpression = j.conditionalExpression(test, consequentIdentifier, alternateIdentifier);
      let newFunctionBlockStatement = j.blockStatement([j.expressionStatement(ternaryExpression)]);
      let newArrowFunction = j.arrowFunctionExpression([], newFunctionBlockStatement, true);

      return j.expressionStatement(j.callExpression(newArrowFunction, []));
    });

  return sourceAST.toSource(printOptions);
}
