import {MOCHA_FUNCTIONS, matchLast as matchLastNode} from './utils';

export default function removeUselessReturnFromTest({source}, {jscodeshift: j}, {printOptions = {}}) {
  const matchLast = matchLastNode.bind(null, j);

  return j(source)
    .find(j.CallExpression, {
      callee: {
        type: 'Identifier',
        name: (name) => MOCHA_FUNCTIONS.has(name),
      },
      arguments: matchLast({
        type: (type) => type === 'ArrowFunctionExpression' || type === 'FunctionExpression',
        body: {
          type: 'BlockStatement',
          body: matchLast({
            type: 'ReturnStatement',
          }),
        },
      }),
    })
    .forEach((path) => {
      const {body: {body}} = path.node.arguments[path.node.arguments.length - 1];
      body[body.length - 1] = j.expressionStatement(body[body.length - 1].argument);
    })
    .toSource(printOptions);
}
