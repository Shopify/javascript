export default function constantFunctionValueToStatement({source}, {jscodeshift: j}, {printOptions = {}}) {
  return j(source)
    .find(j.VariableDeclaration, (path) => j.match(path, {
      kind: 'const',
      declarations: [{
        type: 'VariableDeclarator',
        init: {type: (type) => type === 'FunctionExpression' || type === 'ArrowFunctionExpression'},
      }],
    }) && (path.declarations[0].init.type !== 'ArrowFunctionExpression' || j(path).find(j.ThisExpression).size() === 0))
    .replaceWith((path) => {
      const declarator = path.node.declarations[0];
      const {init: {params, generator, expression}} = declarator;
      let {init: {body}} = declarator;
      if (!j.BlockStatement.check(body)) {
        body = j.blockStatement([j.returnStatement(body)]);
      }

      return j.functionDeclaration(
          declarator.id,
          params,
          body,
          generator,
          expression
        );
    })
    .toSource(printOptions);
}
