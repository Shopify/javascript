export default function simplifyCondAssignIfElseStatement({source}, {jscodeshift: j}, {printOptions = {quote: 'single'}}) {

  function testIsBinaryExpression(path) {
    return j.BinaryExpression.check(path.get('test').node)
  }

  function testChecksIdentifierForNotNull(path) {
    const test = path.get('test').node;
    return (
      j.Identifier.check(test.left) &&
      test.operator === '!=' &&
      j.Literal.check(test.right) &&
      test.right.value === null
    );
  }

  function representsConditionalAssignment(path) {
    const primaryIdentifierName = path.get('test', 'left', 'name').value;
    return (
      isBlockStatementContainingOnlyExpressionStatement(path.get('consequent')) &&
      isBlockStatementContainingOnlyExpressionStatement(path.get('alternate')) &&
      consequentIsPrimaryIdentifier(path, primaryIdentifierName) &&
      alternateAssignsPrimaryIdentifier(path, primaryIdentifierName)
    );
  }

  function isBlockStatementContainingOnlyExpressionStatement({node}) {
   return (
     j.BlockStatement.check(node) &&
     node.body.length === 1 &&
     j.ExpressionStatement.check(node.body[0])
   );
  }

  function consequentIsPrimaryIdentifier(path, primaryIdentifierName) {
    const consequentExpression = path.get('consequent', 'body', 0, 'expression');
    return (
      j.Identifier.check(consequentExpression.node) &&
      consequentExpression.get('name').value === primaryIdentifierName
    );
  }

  function alternateAssignsPrimaryIdentifier(path, primaryIdentifierName) {
    const alternateExpression = path.get('alternate', 'body', 0, 'expression');
    return (
      j.AssignmentExpression.check(alternateExpression.node) &&
      alternateExpression.get('left', 'name').value === primaryIdentifierName
    );
  }

  return j(source)
    .find(j.IfStatement)
    .filter(testIsBinaryExpression)
    .filter(testChecksIdentifierForNotNull)
    .filter(representsConditionalAssignment)
    .replaceWith(({node}) => {
      const {test, alternate} = node;
      const inverseTest = j.binaryExpression('===', test.left, test.right);
      return j.ifStatement(inverseTest, alternate);
    })
    .toSource(printOptions);
}
