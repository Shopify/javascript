export default function functionToArrow(
  {source},
  {jscodeshift: j},
  {printOptions = {quote: 'single'}}
) {
  return j(source)
    .find(j.FunctionExpression)
    .filter((path) => j(path).find(j.ThisExpression).size() === 0)
    .replaceWith(({node}) => {
      const {params} = node;
      let {body} = node;
      const originalBody = body.body;
      // If there is just a single ReturnStatement, just replace the whole body.
      if (originalBody.length === 1 && originalBody[0].type === 'ReturnStatement') {
        body = originalBody[0].argument;
      }
      return j.arrowFunctionExpression(params, body, body.type !== 'BlockStatement');
    })
    .toSource(printOptions);
}
