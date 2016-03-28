export default function conditionalAssignToIfStatement({source}, {jscodeshift: j}, {printOptions = {quote: 'single'}}) {

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

  function isAssigningToConditionObject({node}) {
    const condition = node.left;
    const assignment = node.right.left;
    const isMemberExpression = j.MemberExpression.check(condition);

    return isMemberExpression
      ? isMemberEqual(condition, assignment)
      : isIdentifierEqual(condition, assignment);
  }

  function buildIfAssignBlock(logicalExpression) {
    const originalCondition = logicalExpression.node.left;
    const newCondition = j.unaryExpression('!', originalCondition);
    const assignment = j.expressionStatement(logicalExpression.node.right);
    const assignmentBlock = j.blockStatement([assignment]);
    const ifBlock = j.ifStatement(newCondition, assignmentBlock);

    return ifBlock;
  }

  function replaceAssignAndInvokeExpression(path) {
    const logicalExpression = path.get('object');
    const ifBlock = buildIfAssignBlock(logicalExpression);

    path
      .parent
      .parent
      .insertBefore(ifBlock);

    return j.memberExpression(logicalExpression.node.right.left, path.get('property').value);
  }

  function replaceReturnExpression(path) {
    const logicalExpression = path.get('argument');
    const originalCondition = logicalExpression.node.left;
    const ifBlock = buildIfAssignBlock(logicalExpression);

    path.insertBefore(ifBlock);
    return j.returnStatement(originalCondition);
  }

  function replaceExpression(path) {
    const logicalExpression = path.get('expression');
    const ifBlock = buildIfAssignBlock(logicalExpression);

    path.insertBefore(ifBlock);
    return;
  }

  return j(source)
    .find(j.LogicalExpression, {
      type: (type) => j.LogicalExpression.name === type || j.ReturnStatement.name === type,
      operator: '||',
      left: (left) => j.MemberExpression.check(left) || j.Identifier.check(left),
      right: (right) => j.AssignmentExpression.check(right),
    })
    .filter(isAssigningToConditionObject)
    .map((path) => path.parent)
    .replaceWith((path) => {
      if (j.ReturnStatement.check(path.node)) {
        return replaceReturnExpression(path);
      } else if (j.MemberExpression.check(path.node)) {
        return replaceAssignAndInvokeExpression(path);
      } else {
        return replaceExpression(path);
      }
    })
    .toSource(printOptions);
}
