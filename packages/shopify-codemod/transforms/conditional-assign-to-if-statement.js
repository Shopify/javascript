export default function conditionalAssignToIfStatement({source}, {jscodeshift: j}, {printOptions = {quote: 'single'}}) {
  return j(source)
    .find(j.ExpressionStatement, {
      expression: {
        type: j.LogicalExpression.name,
        operator: (op) => ['&&', '||'].indexOf(op) >= 0,
      },
    })
    .replaceWith(({node: {expression: logicalExpression}}) => {
      const {operator, left: originalCondition, right: assignment} = logicalExpression;
      const newCondition = (operator === '||' ? j.unaryExpression('!', originalCondition) : originalCondition);
      const assignmentBlock = j.blockStatement([
        j.expressionStatement(assignment),
      ]);

      return j.ifStatement(newCondition, assignmentBlock);
    })
    .toSource(printOptions);
}
