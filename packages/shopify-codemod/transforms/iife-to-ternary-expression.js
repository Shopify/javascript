export default function iifeToTernaryExpression({source}, {jscodeshift: j}, {printOptions = {}}) {
  function isIIFEWIthNoParams({node}) {
    return (
      (
        j.ArrowFunctionExpression.check(node.callee) ||
        j.FunctionExpression.check(node.callee)
      ) &&
      node.callee.params.length === 0
    );
  }

  function calleeContainsIfStatement(path) {
    return isBlockStatementContainingOnly(path.get('callee', 'body'), j.IfStatement);
  }

  function ifStatementOnlyReturnsTwoValues(path) {
    const ifStatement = path.get('callee', 'body', 'body', 0);
    return (
      isBlockStatementContainingOnly(ifStatement.get('consequent'), j.ReturnStatement) &&
      isBlockStatementContainingOnly(ifStatement.get('alternate'), j.ReturnStatement)
    );
  }

  function isBlockStatementContainingOnly({node}, childType) {
    return (
      j.BlockStatement.check(node) &&
      node.body.length === 1 &&
      childType.check(node.body[0])
    );
  }

  return j(source)
    .find(j.CallExpression)
    .filter(isIIFEWIthNoParams)
    .filter(calleeContainsIfStatement)
    .filter(ifStatementOnlyReturnsTwoValues)
    .replaceWith((path) => {
      const ifStatement = path.get('callee', 'body', 'body', '0');
      const {test, consequent, alternate} = ifStatement.node;
      const consequentExpression = consequent.body[0].argument;
      const alternateExpression = alternate.body[0].argument;

      return j.conditionalExpression(test, consequentExpression, alternateExpression);
    })
    .toSource(printOptions);
}
