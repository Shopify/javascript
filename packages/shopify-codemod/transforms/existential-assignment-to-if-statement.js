export default function existentialAssignmentToIfStatement({source}, {jscodeshift: j}, {printOptions = {quote: 'single'}}) {

  function hasMatchingLeftValues({node}) {
    const testLeftValue = j(node.test.left).toSource(printOptions);
    const consequentLeftValue = j(node.consequent.body[0].expression).toSource(printOptions);
    const alternateLeftValue = j(node.alternate.body[0].expression.left).toSource(printOptions);

    return testLeftValue === consequentLeftValue && testLeftValue === alternateLeftValue;
  }

  return j(source)
    .find(j.IfStatement, {
      test: {
        type: j.BinaryExpression.name,
        left: (left) => j.Identifier.check(left) || j.MemberExpression.check(left),
        operator: '!=',
        right: {type: j.Literal.name, value: null},
      },
      consequent: {
        body: (body) => (
          body.length === 1 &&
          (j.Identifier.check(body[0].expression) || j.MemberExpression.check(body[0].expression))
        ),
      },
      alternate: {
        body: (body) => body.length === 1 && j.AssignmentExpression.check(body[0].expression),
      },
    })
    .filter(hasMatchingLeftValues)
    .replaceWith(({node: {test, alternate}}) => {
      const inverseTest = j.binaryExpression('==', test.left, test.right);
      return j.ifStatement(inverseTest, alternate);
    })
    .toSource(printOptions);
}
