import {MOCHA_FUNCTIONS} from './utils';

export default function removeUselessReturnFromTest({source}, {jscodeshift: j}, {printOptions = {}}) {
  function matchLast(matcher) {
    return (nodes) => nodes.length > 0 && j.match(nodes[nodes.length - 1], matcher);
  }

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
