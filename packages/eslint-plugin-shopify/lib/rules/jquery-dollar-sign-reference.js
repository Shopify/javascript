var JQUERY_IDENTIFIERS = ['$', 'jQuery'];

var nonChainingMethods = {
  context: true,
  get: true,
  hasClass: true,
  height: true,
  index: true,
  innerHeight: true,
  innerWidth: true,
  is: true,
  offset: true,
  outerHeight: true,
  outerWidth: true,
  position: true,
  promise: true,
  scrollLeft: true,
  scrollTop: true,
  serialize: true,
  serializeArray: true,
  size: true,
  text: true,
  toArray: true,
  triggerHandler: true,
  val: true,
  width: true,

  html: function(node) {
    return node.arguments.length === 0;
  },
  data: function(node) {
    return node.arguments.length < 2 && node.arguments[0] && node.arguments[0].type !== 'ObjectExpression';
  },
  prop: function(node) {
    return node.arguments.length < 2 && node.arguments[0] && node.arguments[0].type !== 'ObjectExpression';
  },
  attr: function(node) {
    return node.arguments.length < 2 && node.arguments[0] && node.arguments[0].type !== 'ObjectExpression';
  },
};

var JQUERY_IDENTIFIER_REGEX = /^\$./;

module.exports = function(context) {
  function getFinalReferenceName(node) {
    switch (node.type) {
    case 'Identifier': return node.name;
    case 'Literal': return node.value;
    case 'MemberExpression': return getFinalReferenceName(node.property);
    default: return null;
    }
  }

  function isjQueryReference(node) {
    var referenceName = getFinalReferenceName(node);
    return referenceName != null && JQUERY_IDENTIFIER_REGEX.test(referenceName);
  }

  function isjQueryCallExpression(node) {
    return isCallExpression(node) && JQUERY_IDENTIFIERS.indexOf(node.callee.name) >= 0;
  }

  function isCallExpression(node) {
    return node.type === 'CallExpression';
  }

  function isjQueryStartValue(node) {
    return (node.type === 'Identifier' && isjQueryReference(node)) || isjQueryCallExpression(node);
  }

  function isjQueryValue(node) {
    var relevantNode = node;
    var validChain = true;

    while (relevantNode.callee && relevantNode.callee.type === 'MemberExpression') {
      var prop = relevantNode.callee.property.name;

      var check = nonChainingMethods[prop];
      if (check === true || (typeof check === 'function' && check(relevantNode))) {
        validChain = false;
      }

      relevantNode = relevantNode.callee.object;
    }

    var isjQueryStart = isjQueryStartValue(relevantNode);
    var definiteNo = isjQueryStart && !validChain;
    return {
      definite: isjQueryStart && validChain,
      possible: !definiteNo && ((isjQueryStart && node.type === 'Identifier') || isCallExpression(node)),
    };
  }

  function checkForValidjQueryReference(node, left, right) {
    if (right == null) { return; }
    var isjQueryRef = isjQueryReference(left);
    var isjQueryVal = isjQueryValue(right);

    if (isjQueryRef && !isjQueryVal.possible) {
      context.report(node, 'Don’t use a $-prefixed identifier for a non-jQuery value.');
    } else if (!isjQueryRef && isjQueryVal.definite) {
      context.report(node, 'Use a $-prefixed identifier for a jQuery value.');
    }
  }

  function handleVariableDeclarator(node) {
    checkForValidjQueryReference(node, node.id, node.init);
  }

  function handleAssignmentExpression(node) {
    if (node.left.type === 'MemberExpression' && node.left.computed && node.left.property.type !== 'Literal') {
      return;
    }

    checkForValidjQueryReference(node, node.left, node.right);
  }

  function handleObjectExpression(node) {
    node.properties.forEach(function(prop) {
      if (prop.computed && prop.key.type !== 'Literal') {
        return;
      }

      checkForValidjQueryReference(prop, prop.key, prop.value);
    });
  }

  function handleClassProperty(node) {
    var tokens = context.getFirstTokens(node, 2).filter(function(token) {
      return token.type === 'Identifier';
    });

    var id = tokens[tokens.length - 1];
    var fakeIdentifier = Object.create(id, {
      name: {get: function() { return this.value; }},
    });

    checkForValidjQueryReference(node, fakeIdentifier, node.value);
  }

  return {
    VariableDeclarator: handleVariableDeclarator,
    AssignmentExpression: handleAssignmentExpression,
    ObjectExpression: handleObjectExpression,
    ClassProperty: handleClassProperty,
    // Program: function(node) { console.log(node); }
  };
};

module.exports.schema = [
    // fill in your schema
];
