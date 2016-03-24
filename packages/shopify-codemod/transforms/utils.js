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
