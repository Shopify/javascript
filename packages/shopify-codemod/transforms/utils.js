import j from 'jscodeshift';

export function findFirstMember(node) {
  if (j.MemberExpression.check(node)) {
    return findFirstMember(node.object);
  }
  return node;
}

export function findLastMember(node) {
  if (j.MemberExpression.check(node)) {
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
    if (!j.ExpressionStatement.check(body[i]) || !looksLikeDirective(body[i].expression)) {
      break;
    }
  }
  body.splice(i, 0, newNode);
  return body;
}

export function isDirective({node, parentPath}) {
  const {expression} = node;

  return (
    j.ExpressionStatement.check(node) &&
    looksLikeDirective(expression) &&
    directivesForNode(parentPath.node).indexOf(node) >= 0
  );
}

const typesSupportingDirectives = new Set([j.Program.name, j.BlockStatement.name]);
function directivesForNode(node) {
  if (!typesSupportingDirectives.has(node.type)) { return []; }

  const directives = [];
  for (const expression of node.body) {
    if (!j.ExpressionStatement.check(expression) || !looksLikeDirective(expression.expression)) {
      break;
    }

    directives.push(expression);
  }

  return directives;
}

function looksLikeDirective(node) {
  return j.Literal.check(node) && typeof node.value === 'string';
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

export function pathIsFirstMember({node, parentPath: {node: parentNode}}) {
  return !j.MemberExpression.check(parentNode) || parentNode.object === node;
}

const IDENTIFIER_REGEX = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/;

export function isValidIdentifier(identifier) {
  return typeof identifier === 'string' && IDENTIFIER_REGEX.test(identifier);
}

export function getPropertyName({key, computed}) {
  if (computed) { return null; }
  return j.Identifier.check(key) ? key.name : key.value;
}

export function containsThisExpression(node) {
  return j(node).find(j.ThisExpression).size() > 0;
}

export function isFunctionExpression(node) {
  return j.FunctionExpression.check(node) || j.ArrowFunctionExpression.check(node);
}

export function getBlockStatementFromFunction({body}) {
  if (!j.BlockStatement.check(body)) {
    return j.blockStatement([j.returnStatement(body)]);
  }

  return body;
}

function escapeRegexString(string) {
  return string.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&');
}

function possibleStringToRegex(val) {
  if (typeof val === 'string') {
    return new RegExp(`^${escapeRegexString(val)}$`);
  }

  return val;
}

export function createMemberExpressionMatcher(matchers) {
  matchers = matchers.map((matcher) => ({
    object: possibleStringToRegex(matcher.object),
    methods: matcher.methods.map(possibleStringToRegex),
  }));

  return function isMatchingNode(node) {
    if (node == null) { return false; }

    const {object, property, computed} = node;
    if (!j.MemberExpression.check(node) || !j.Identifier.check(object) || computed) {
      return false;
    }

    return matchers.some((matcher) => (
      matcher.object.test(object.name) &&
      matcher.methods.some((method) => method.test(property.name))
    ));
  };
}

// from https://github.com/sindresorhus/globals/blob/1e9ebc39828b92bd5c8ec7dc7bb07d62f2fb0153/globals.json#L852

// Waiting for https://github.com/benmosher/eslint-plugin-import/commit/92f7d655dbba9c0c169cd129baf1af4ecd8a2456 to merge
// eslint-disable-next-line import/prefer-default-export
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
