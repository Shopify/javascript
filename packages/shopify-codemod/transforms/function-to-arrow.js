export default function functionToArrow(file, api, options) {
  const j = api.jscodeshift;
  const printOptions = options.printOptions || {quote: 'single'};

  return j(file.source)
    .find(j.FunctionExpression)
    .filter((path) => j(path).find(j.ThisExpression).size() === 0)
    .replaceWith((path) => {
      const {params} = path.node;
      let body = path.node.body;
      // If there is just a single ReturnStatement, just replace the whole body.
      if (body.body.length === 1 && body.body[0].type === 'ReturnStatement') {
        body = body.body[0].argument;
      }
      return j.arrowFunctionExpression(params, body, body.type !== 'BlockStatement');
    })
    .toSource(printOptions);
}
