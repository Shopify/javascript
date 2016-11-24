export default function splitAssignmentSequences({source}, {jscodeshift: j}, {printOptions = {quote: 'single'}}) {
  return j(source)
    .find(j.ExpressionStatement, {
      expression: (node) => j.SequenceExpression.check(node),
    })
    .filter((path) => {
      const expressions = path.value.expression.expressions;
      const lastExpression = expressions[expressions.length - 1];
      const otherExpressions = expressions.slice(0, -1);

      return j.Identifier.check(lastExpression) &&
        otherExpressions.every(j.AssignmentExpression.check) &&
        otherExpressions.every((expression) =>
          expression.right.object.name === lastExpression.name,
        );
    })
    .forEach((path) => {
      const expressions = path.value.expression.expressions;
      expressions.pop();
      expressions.forEach((expression) => {
        path.insertBefore(
          j.expressionStatement(expression),
       );
      });

      path.replace(null);
    })
    .toSource(printOptions);
}
