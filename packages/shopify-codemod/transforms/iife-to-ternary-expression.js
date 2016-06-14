export default function iifeToTernaryExpression({source}, {jscodeshift: j}, {printOptions = {}}) {
  function isIIFE(path) {
    return j.ArrowFunctionExpression.check(path.node.callee);
  }

  function calleeContainsIfStatement(path) {
    return isBlockStatementContainingOnly(path.get('callee', 'body'), j.IfStatement);
  }

  function ifStatementOnlyReturnsTwoValues(path) {
    const ifStatement = path.get('callee', 'body', 'body', 0);
    return isBlockStatementContainingOnly(ifStatement.get('consequent'), j.ReturnStatement) &&
           isBlockStatementContainingOnly(ifStatement.get('alternate'), j.ReturnStatement);
  }

  function isBlockStatementContainingOnly(path, childType) {
    return j.BlockStatement.check(path.node) &&
           path.node.body.length === 1 &&
           childType.check(path.node.body[0]);
  }

  return j(source)
    .find(j.CallExpression)
    .filter(isIIFE)
    .filter(calleeContainsIfStatement)
    .filter(ifStatementOnlyReturnsTwoValues)
    .replaceWith((path) => {
      const ifStatement = path.get('callee', 'body', 'body', '0');
      const {test, consequent, alternate} = ifStatement.node;
      const consequentIdentifier = consequent.body[0].argument;
      const alternateIdentifier = alternate.body[0].argument;

      return j.conditionalExpression(test, consequentIdentifier, alternateIdentifier);
    })
    .toSource(printOptions);
}
