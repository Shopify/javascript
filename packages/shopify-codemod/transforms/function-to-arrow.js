export default function functionToArrow({source}, {jscodeshift: j}, {printOptions = {}}) {
  return j(source)
    .find(j.FunctionExpression)
    .filter(({parent}) => !j.MethodDefinition.check(parent.node) && !j.Property.check(parent.node))
    .filter((path) => j(path).find(j.ThisExpression).size() === 0)
    .replaceWith(({node}) => {
      const {params} = node;
      let {body} = node;
      const originalBody = body.body;
      // If there is just a single ReturnStatement, just replace the whole body.
      if (originalBody.length === 1 && originalBody[0].type === 'ReturnStatement') {
        if (originalBody[0].argument != null) {
          body = originalBody[0].argument;
        } else {
          body = j.blockStatement([]);
        }
      }
      return j.arrowFunctionExpression(params, body, body.type !== 'BlockStatement');
    })
    .toSource(printOptions);
}
