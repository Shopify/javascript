import {containsThisExpression} from './utils';

export default function functionToArrow({source}, {jscodeshift: j}, {printOptions = {}}) {
  function isMember({parent}) {
    return j.MethodDefinition.check(parent.node) || j.Property.check(parent.node);
  }

  function isConvertibleFunction(path) {
    return !isMember(path) && !containsThisExpression(path);
  }

  const sourceAST = j(source);

  sourceAST
    .find(j.ArrowFunctionExpression, {
      body: {
        body: [{type: j.ReturnStatement.name}],
      },
    })
    .replaceWith(({node: {params, body: {body: [{argument}]}}}) => (
      j.arrowFunctionExpression(params, argument, true)
    ));

  sourceAST
    .find(j.FunctionExpression)
    .filter(isConvertibleFunction)
    .replaceWith(({node}) => {
      const {params} = node;
      let {body} = node;
      const originalBody = body.body;
      // If there is just a single ReturnStatement, just replace the whole body.
      if (originalBody.length === 1 && originalBody[0].type === 'ReturnStatement') {
        if (originalBody[0].argument == null) {
          body = j.blockStatement([]);
        } else {
          body = originalBody[0].argument;
        }
      }
      return j.arrowFunctionExpression(params, body, body.type !== 'BlockStatement');
    });

  return sourceAST.toSource(printOptions);
}
