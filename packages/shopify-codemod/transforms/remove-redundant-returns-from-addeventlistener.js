export default function transformer(file, api) {
  const j = api.jscodeshift;
  return j(file.source) // parse input to AST
    .find(j.CallExpression, {
      callee: {
        type: 'MemberExpression',
        property: {
          name: 'addEventListener',
        },
      },
    })
    .forEach(
      (nodes) => {
        const functionExpression = nodes.value.arguments[1];
        const {body} = functionExpression.body;
        const lastStatement = body[body.length - 1];
        if (lastStatement.type === 'ReturnStatement') {
          if (lastStatement.argument === null) {
            body.pop(); // remove returns with no args
          }
          body[body.length - 1] = j.expressionStatement(body[body.length - 1].argument);
        } else {
          return nodes;
        }
      }
    )
    .toSource();
}
