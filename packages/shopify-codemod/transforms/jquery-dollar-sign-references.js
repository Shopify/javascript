export default function jQueryDollarSignReferences({source}, {jscodeshift: j}, {printOptions = {}}) {
  const sourceAST = j(source);

  const toConvert = [];

  sourceAST
    .find(j.VariableDeclaration, {
      declarations: [
        {
          type: 'VariableDeclarator',
          id: {
            type: 'Identifier',
          },
          init: {
            type: 'CallExpression',
            callee: {
              type: 'Identifier',
              name: '$',
            },
          },
        },
      ],
    }).forEach(({node: {declarations}}) => {
      declarations.forEach((node) => {
        toConvert.push(node.id.name);
        node.id.name = `$${node.id.name}`;
      });
    });

  sourceAST.find(j.ExpressionStatement, {
    type: 'ExpressionStatement',
    expression: {
      type: 'CallExpression',
      callee: {
        type: 'MemberExpression',
      },
    },
  })
  .filter(({node: {expression: {callee: {object}}}}) => toConvert.indexOf(object.name || object.callee.object.name) > -1)
  .forEach(({node: {expression: {callee: {object}}}}) => {
    if (object.name) {
      object.name = `$${object.name}`;
    } else {
      object.callee.object.name = `$${object.callee.object.name}`;
    }
  });

  return sourceAST
    .toSource(printOptions);
}
