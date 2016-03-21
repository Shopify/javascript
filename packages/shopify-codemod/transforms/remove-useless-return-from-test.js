// from https://github.com/sindresorhus/globals/blob/1e9ebc39828b92bd5c8ec7dc7bb07d62f2fb0153/globals.json#L852
const FUNCTIONS = [
  'after',
  'afterEach',
  'before',
  'beforeEach',
  'context',
  'describe',
  'it',
  'mocha',
  'setup',
  'specify',
  'suite',
  'suiteSetup',
  'suiteTeardown',
  'teardown',
  'test',
  'xcontext',
  'xdescribe',
  'xit',
  'xspecify',
];

export default function removeUselessReturnFromTest({source}, {jscodeshift: j}, {printOptions = {}}) {
  function matchLast(matcher) {
    return (nodes) => nodes.length > 0 && j.match(nodes[nodes.length - 1], matcher);
  }

  return j(source)
    .find(j.CallExpression, {
      callee: {
        type: 'Identifier',
        name: (name) => FUNCTIONS.indexOf(name) >= 0,
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
