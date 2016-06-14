export default function removePointlessReturnsFromMethods({source}, {jscodeshift: j}, {printOptions = {}}) {
  const sourceAST = j(source);
  const POINTLESS_RETURN_METHODS = {
    _: new Set(['each', 'filter']),
  };
  sourceAST
    .find(j.CallExpression)
    .filter(({node: {callee}}) => POINTLESS_RETURN_METHODS[callee.object.name].has(callee.property.name))
    .forEach((nodePath) => {
      const body = nodePath.node.arguments.filter((arg) => j.Function.check(arg))[0].body.body;
      const returnLine = body.pop();
      body.push(j.expressionStatement(returnLine.argument));
    });

  return sourceAST
    .toSource(printOptions);
}
