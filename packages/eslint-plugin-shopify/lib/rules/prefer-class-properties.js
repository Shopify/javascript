module.exports = {
  meta: {
    docs: {},
    schema: [{
      enum: ['always', 'never'],
    }],
  },

  create: function(context) {
    var applyAlways = ((context.options[0] || 'always') === 'always');

    function isSimpleLiteralProperty(prop) {
      return !prop.computed && isSimpleLiteral(prop.value);
    }

    function isSimpleLiteral(node) {
      return node.type === 'Literal' ||
        ((node.type === 'MemberExpression') && isSimpleLiteral(node.object)) ||
        ((node.type === 'CallExpression') && isSimpleLiteral(node.callee)) ||
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
          message: 'Unexpected assignment of literal instance member.',
        });
      }
    }

    function getTopLevelThisAssignmentExpressions(functionNode) {
      return functionNode
        .body
        .body
        .filter(function(bodyNode) {
          return bodyNode.type === 'ExpressionStatement' &&
            bodyNode.expression.type === 'AssignmentExpression' &&
            bodyNode.expression.left.type === 'MemberExpression' &&
            bodyNode.expression.left.object.type === 'ThisExpression';
        })
        .map(function(bodyNode) {
          return bodyNode.expression;
        });
    }

    function getConstructor(classNode) {
      return classNode
        .body
        .body
        .find(function(propertyNode) {
          return propertyNode.type === 'MethodDefinition' && propertyNode.key.name === 'constructor';
        });
    }

    function getClassInstanceProperties(classNode) {
      return classNode
        .body
        .body
        .filter(function(propertyNode) {
          return propertyNode.type === 'ClassProperty' && !propertyNode.static;
        });
    }

    function checkClassDeclaration(node) {
      if (applyAlways) {
        var constructor = getConstructor(node);
        if (!constructor) { return; }

        getTopLevelThisAssignmentExpressions(constructor.value).forEach(checkConstructorThisAssignment);
      } else {
        getClassInstanceProperties(node).forEach(function(propertyNode) {
          context.report({
            node: propertyNode,
            message: 'Unexpected class property.',
          });
        });
      }
    }

    return {
      ClassDeclaration: checkClassDeclaration,
    };
  },
};
