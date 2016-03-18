export default function ternaryStatementToIfStatement(file, api, options) {
  const j = api.jscodeshift;
  const printOptions = options.printOptions || {quote: 'single'};

  return j(file.source)
    .find(j.ConditionalExpression)
    .filter((path) => path.parent.node.type === 'ExpressionStatement' || path.parent.node.type === 'ReturnStatement')
    .map((path) => path.parent)
    .replaceWith((parent) => {
      let path;
      let statement;
      switch (parent.node.type) {
      case 'ExpressionStatement':
        path = parent.get('expression');
        statement = j.expressionStatement;
        break;
      case 'ReturnStatement':
        path = parent.get('argument');
        statement = j.returnStatement;
        break;
      }

      const consequent = j.blockStatement([statement(path.node.consequent)]);
      let alternate = null;
      if (!j.match(path.node.alternate, {type: 'Identifier', name: 'undefined'})) {
        alternate = j.blockStatement([statement(path.node.alternate)]);
      }

      return j.ifStatement(path.node.test, consequent, alternate);
    })
    .toSource(printOptions);
}
