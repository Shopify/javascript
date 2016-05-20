import j from 'jscodeshift';

export function findFirstMember(node) {
  if (node.type === 'MemberExpression') {
    return findFirstMember(node.object);
  }
  return node;
}

export function findLastMember(node) {
  if (node.type === 'MemberExpression') {
    return findLastMember(node.property);
  }
  return node;
}

export function matchLast(matcher) {
  return (nodes) => nodes.length > 0 && j.match(nodes[nodes.length - 1], matcher);
}

export function insertAfterDirectives(body, newNode) {
  let i = 0;
  for (;i < body.length; i++) {
    if (body[i].type !== 'ExpressionStatement' || body[i].expression.type !== 'Literal') {
      break;
    }
  }
  body.splice(i, 0, newNode);
  return body;
}

export function isUndefined(node) {
  return j.match(node, {
    type: 'Identifier',
    name: 'undefined',
  }) || j.match(node, {
    type: 'UnaryExpression',
    operator: 'void',
    argument: {type: 'Literal', value: 0},
  });
}

// from https://github.com/sindresorhus/globals/blob/1e9ebc39828b92bd5c8ec7dc7bb07d62f2fb0153/globals.json#L852
export const MOCHA_FUNCTIONS = new Set([
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
]);
