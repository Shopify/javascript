export default function implicitCoercionToExplicit({source}, {jscodeshift: j}, {printOptions = {quote: 'single'}}) {
  const sourceAST = j(source);

  sourceAST
    .find(j.UnaryExpression, {
      operator: '!',
      argument: {
        type: j.UnaryExpression.name,
        operator: '!',
      },
    })
    .replaceWith(({node: {argument: {argument}}}) => (
      j.callExpression(j.identifier('Boolean'), [argument])
    ));

  sourceAST
    .find(j.UnaryExpression, {
      operator: '+',
    })
    .replaceWith(({node: {argument}}) => (
      j.callExpression(j.identifier('Number'), [argument])
    ));

  return sourceAST.toSource(printOptions);
}
