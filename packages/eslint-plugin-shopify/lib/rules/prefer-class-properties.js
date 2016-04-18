module.exports = function(context) {
  var applyAlways = ((context.options[0] || 'always') === 'always');

  function isSimpleLiteralProperty(prop) {
    return !prop.computed && isSimpleLiteral(prop.value);
  }

  function isSimpleLiteral(node) {
    return node.type === 'Literal' ||
      (node.type === 'MemberExpression') && isSimpleLiteral(node.object) ||
      (node.type === 'CallExpression') && isSimpleLiteral(node.callee) ||
      (node.type === 'ArrayExpression' && node.elements.every(isSimpleLiteral)) ||
      (node.type === 'ObjectExpression' && node.properties.every(isSimpleLiteralProperty));
  }

  function isStaticMemberExpression(node) {
    while (node && node.type === 'MemberExpression') {
      if (node.computed && node.property.type !== 'Literal') {
        return false;
      }

      node = node.object;
    }

    return true;
  }

  function checkConstructorThisAssignment(node) {
    if (isSimpleLiteral(node.right) && isStaticMemberExpression(node.left)) {
      context.report({
        node: node,
        message: 'BAD!',
      });
    }
  }

  function checkClassDeclaration(node) {
    if (applyAlways) {
      var constructor = node
        .body
        .body
        .find(function(propertyNode) {
          return propertyNode.type === 'MethodDefinition' && propertyNode.key.name === 'constructor';
        });

      if (!constructor) { return; }

      constructor
        .value
        .body
        .body
        .filter(function(bodyNode) {
          return bodyNode.type === 'ExpressionStatement' &&
            bodyNode.expression.type === 'AssignmentExpression' &&
            bodyNode.expression.left.type === 'MemberExpression' &&
            bodyNode.expression.left.object.type === 'ThisExpression';
        })
        .map(function(bodyNode) { return bodyNode.expression; })
        .forEach(checkConstructorThisAssignment);
    } else {
      node
        .body
        .body
        .filter(function(propertyNode) {
          return propertyNode.type === 'ClassProperty' && !propertyNode.static;
        })
        .forEach(function(propertyNode) {
          context.report({
            node: propertyNode,
            message: 'BAD!',
          });
        });
    }
  }

  return {
    ClassDeclaration: checkClassDeclaration,
  };
};

module.exports.schema = [{
  enum: ['always', 'never'],
}];
