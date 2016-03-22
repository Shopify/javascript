function isConditionalAssignment(node) {
  const isUsingOr = (node.operator === '||');
  const isLeftCheckingVariable = (node.left.type === 'MemberExpression') || (node.left.type === 'Identifier');
  const isRightAssignment = (node.right.type === 'AssignmentExpression');

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
  const isMemberExpression = (condition.type === 'MemberExpression');

  return isMemberExpression
    ? isMemberEqual(condition, assignment)
    : isIdentifierEqual(condition, assignment);
}

function blockifyAssignment(j, node) {
  const assignment = j.expressionStatement(node);
  const assignmentBlock = j.blockStatement([assignment]);

  return assignmentBlock;
}

function negateExistenceCondition(j, oldCondition) {
  const booleanCheck = j.callExpression(j.identifier('Boolean'), [oldCondition]);
  const newCondition = j.unaryExpression('!', booleanCheck);

  return newCondition;
}

export default function conditionalAssignToIfStatement(file, api, options) {
  const j = api.jscodeshift;
  const printOptions = options.printOptions || {quote: 'single'};

  return j(file.source)
    .find(j.LogicalExpression, (node) => isConditionalAssignment(node) && isAssigningToConditionObject(node))
    .replaceWith((path) => {
      const condition = negateExistenceCondition(j, path.node.left);
      const assignment = blockifyAssignment(j, path.node.right);

      return j.ifStatement(condition, assignment);
    })
    .toSource(printOptions);
}
