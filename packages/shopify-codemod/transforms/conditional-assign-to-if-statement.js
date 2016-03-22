export default function conditionalAssignToIfStatement({source}, {jscodeshift: j}, {printOptions = {quote: 'single'}}) {
  function isConditionalAssignment(node) {
    const isUsingOr = (node.operator === '||');
    const isLeftCheckingVariable = (j.MemberExpression.check(node.left) || j.Identifier.check(node.left));
    const isRightAssignment = j.AssignmentExpression.check(node.right);

    return isUsingOr && isLeftCheckingVariable && isRightAssignment;
  }

  function isMemberEqual(aNode, bNode) {
    return (
      aNode.object.type === bNode.object.type &&
      aNode.object.name === bNode.object.name &&
      aNode.property.type === bNode.property.type &&
      aNode.property.name === bNode.property.name
    );
  }

  function isIdentifierEqual(aNode, bNode) {
    return (
      aNode.type === bNode.type &&
      aNode.name === bNode.name
    );
  }

  function isAssigningToConditionObject(node) {
    const condition = node.left;
    const assignment = node.right.left;
    const isMemberExpression = j.MemberExpression.check(condition);

    return isMemberExpression
      ? isMemberEqual(condition, assignment)
      : isIdentifierEqual(condition, assignment);
  }

  function blockifyAssignment(node) {
    const assignment = j.expressionStatement(node);
    const assignmentBlock = j.blockStatement([assignment]);

    return assignmentBlock;
  }

  function negateExistenceCondition(oldCondition) {
    return j.unaryExpression('!', oldCondition);
  }

  return j(source)
    .find(j.LogicalExpression, (node) => isConditionalAssignment(node) && isAssigningToConditionObject(node))
    .map((path) => path.parent)
    .replaceWith((path) => {
      const isReturning = j.ReturnStatement.check(path.node);
      const logicalExpression = isReturning ? path.get('argument') : path.get('expression');
      const originalCondition = logicalExpression.node.left;
      const newCondition = negateExistenceCondition(originalCondition);
      const assignment = blockifyAssignment(logicalExpression.node.right);
      const ifBlock = j.ifStatement(newCondition, assignment);

      path.insertBefore(ifBlock);

      if (isReturning) {
        return j.returnStatement(originalCondition);
      } else {
        return;
      }
    })
    .toSource(printOptions);
}
