export default function removeAddEventListenerReturns({source}, {jscodeshift: j}, {printOptions = {}}) {
  return j(source)
    .find(j.CallExpression, {
      callee: {
        type: 'MemberExpression',
        property: {
          name: 'addEventListener',
        },
      },
      arguments: {
        1: {
          type: 'ArrowFunctionExpression',
          body: {
            body: (lines) => j.ReturnStatement.check(lines[lines.length - 1]),
          },
        },
      },
    })
    .forEach(
      ({node}) => {
        const functionExpression = node.arguments[1];
        const {body} = functionExpression.body;
        const lastStatement = body[body.length - 1];
        if (lastStatement.argument === null) {
          body.pop();
          return node;
        }
        body[body.length - 1] = j.expressionStatement(body[body.length - 1].argument);
        return node;
      },
    )
    .toSource(printOptions);
}
