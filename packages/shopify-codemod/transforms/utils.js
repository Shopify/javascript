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
