export default function removeEmptyReturns({source}, {jscodeshift: j}, {printOptions = {}}) {
  const sourceAST = j(source);

  sourceAST
  .find(j.FunctionDeclaration, {
    body: {
      body: (lines) => j.ReturnStatement.check(lines[lines.length - 1]),
    },
  })
  .forEach(({node}) => {
    node.body.body[node.body.body.length - 1] = null;
  });

  sourceAST
  .find(j.ArrowFunctionExpression, {
    body: {
      body: (lines) => j.ReturnStatement.check(lines[lines.length - 1]),
    },
  })
  .forEach(({node}) => {
    node.body.body[node.body.body.length - 1] = null;
  });

  sourceAST
  .find(j.FunctionExpression, {
    body: {
      body: (lines) => j.ReturnStatement.check(lines[lines.length - 1]),
    },
  })
  .forEach(({node}) => {
    node.body.body[node.body.body.length - 1] = null;
  });
  return sourceAST
    .toSource(printOptions);
}
