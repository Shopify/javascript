import {MOCHA_FUNCTIONS, matchLast} from './utils';

export default function removeUselessReturnFromTest({source}, {jscodeshift: j}, {printOptions = {}}) {
  function isUselessIIFE(node) {
    return j.match(node, {
      type: j.CallExpression.name,
      callee: {
        type: isFunctionExpressionType,
        params: (params) => params.length === 0,
      },
    });
  }

  function isFunctionExpressionType(type) {
    return type === j.ArrowFunctionExpression.name || type === j.FunctionExpression.name;
  }

  return j(source)
    .find(j.CallExpression, {
      callee: {
        type: 'Identifier',
        name: (name) => MOCHA_FUNCTIONS.has(name),
      },
      arguments: matchLast({
        type: isFunctionExpressionType,
        body: {
          type: j.BlockStatement.name,
          body: matchLast({
            type: j.ReturnStatement.name,
          }),
        },
      }),
    })
    .forEach((path) => {
      const {body: {body}} = path.node.arguments[path.node.arguments.length - 1];
      const returnStatement = body[body.length - 1];
      if (returnStatement.argument) {
        if (isUselessIIFE(returnStatement.argument)) {
          returnStatement.argument.callee.body.body.forEach((statement) => { body[body.length - 1] = statement; });
        } else {
          body[body.length - 1] = j.expressionStatement(returnStatement.argument);
        }
      } else {
        body.pop();
      }
    })
    .toSource(printOptions);
}
