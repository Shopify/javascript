export default function addMissingParseintRadix({source}, {jscodeshift: j}, {printOptions = {quote: 'single'}}) {
  function addMissingRadix({node: {arguments: params}}) {
    if (params.length > 1) { return; }
    params.push(j.literal(10));
  }

  const sourceAST = j(source);

  sourceAST
    .find(j.CallExpression, {
      callee: {
        type: j.Identifier.name,
        name: 'parseInt',
      },
    })
    .forEach(addMissingRadix);

  sourceAST
    .find(j.CallExpression, {
      callee: {
        type: j.MemberExpression.name,
        object: {
          type: j.Identifier.name,
          name: 'Number',
        },
        property: {
          type: j.Identifier.name,
          name: 'parseInt',
        },
      },
    })
    .forEach(addMissingRadix);

  return sourceAST.toSource(printOptions);
}
