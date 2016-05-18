export default function coffeescriptSoakToCondition({source}, {jscodeshift: j}, {printOptions = {}}) {
  function handleOffensiveConditional(path) {
    let memberExpression;
    let condition;
    let currentConsequent = path;

    while (isOffensiveConditionalExpression(currentConsequent)) {
      const currentTest = currentConsequent.get('test');
      const newMembers = getBaseExpressionFromTest(currentTest);
      memberExpression = augmentMemberExpression(memberExpression, newMembers);
      if (hasCallExpression(memberExpression)) { return; }

      const newCondition = isFunctionCheck(currentTest.value)
        ? j.binaryExpression('===', j.unaryExpression('typeof', memberExpression), j.literal('function'))
        : createLooseUndefinedCheck(memberExpression);

      condition = (condition == null)
        ? newCondition
        : j.logicalExpression('&&', condition, newCondition);

      currentConsequent = currentConsequent.get('consequent');
    }

    const {node} = path;
    const finalValue = augmentMemberExpression(memberExpression, currentConsequent.value);
    const parentPath = path.parentPath;
    const parentNode = parentPath.node;

    if (j.VariableDeclarator.check(parentNode) && parentPath.parentPath.node.declarations.length === 1) {
      parentPath.parentPath.parentPath.replace(
        j.ifStatement(
          condition,
          j.blockStatement([
            j.variableDeclaration('var', [
              j.variableDeclarator(
                parentPath.get('id').value,
                finalValue
              ),
            ]),
          ])
        )
      );
    } else if (j.ExpressionStatement.check(parentNode)) {
      parentPath.replace(
        j.ifStatement(
          condition,
          j.blockStatement([j.expressionStatement(finalValue)])
        )
      );
    } else if (j.ReturnStatement.check(parentNode)) {
      parentPath.replace(
        j.ifStatement(
          condition,
          j.blockStatement([j.returnStatement(finalValue)]),
          j.blockStatement([j.returnStatement(j.literal(null))])
        )
      );
    } else if (isConditionalTest(parentNode)) {
      path.replace(
        j.logicalExpression('&&', condition, finalValue)
      );
    } else if (j.BinaryExpression.check(parentNode) && hasDeterminableDefinedState(opposite(path).node)) {
      const matchesUndefined = isBinaryExpressionThatMatchesUndefined(parentNode);

      const isOnRight = (parentNode.right === node);
      const leftArg = isOnRight ? parentNode.left : finalValue;
      const rightArg = isOnRight ? finalValue : parentNode.right;
      const newBinaryExpression = j.binaryExpression(parentNode.operator, leftArg, rightArg);

      parentPath.replace(
        j.logicalExpression(
          matchesUndefined ? '||' : '&&',
          matchesUndefined ? invertCondition(condition) : condition,
          newBinaryExpression
        )
      );
    } else if (j.UnaryExpression.check(parentNode) && parentNode.operator === '!') {
      parentPath.replace(
        j.logicalExpression('||', invertCondition(condition), j.unaryExpression('!', finalValue))
      );
    } else {
      path.replace(
        j.conditionalExpression(condition, finalValue, j.identifier('undefined'))
      );
    }
  }

  function isNotUndefined(node) {
    return (
      j.Literal.check(node) ||
      j.ArrayExpression.check(node) ||
      j.ObjectExpression.check(node) ||
      j.NewExpression.check(node)
    );
  }

  function hasDeterminableDefinedState(node) {
    return node != null && (isNotUndefined(node) || isUndefined(node));
  }

  function opposite(path) {
    const {node, parentPath} = path;
    return parentPath.node.left === node ? parentPath.get('right') : parentPath.get('left');
  }

  function invertCondition(condition) {
    const opposites = {'!=': '==', '===': '!=='};
    let currentCondition = condition;

    while (currentCondition != null) {
      if (j.LogicalExpression.check(currentCondition)) {
        currentCondition.right.operator = opposites[currentCondition.right.operator];
        currentCondition.operator = '||';
      } else {
        currentCondition.operator = opposites[currentCondition.operator];
      }

      currentCondition = currentCondition.left;
    }

    return condition;
  }

  function isBinaryExpressionThatMatchesUndefined(expression) {
    const {left, right, operator} = expression;

    return j.BinaryExpression.check(expression) &&
      (
        (operator === '==' && (isNull(right) || isNull(left))) ||
        ((operator === '===' || operator === '==') && (isUndefined(right) || isUndefined(left)))
      );
  }

  function isConditionalTest(node) {
    return j.IfStatement.check(node) ||
      j.WhileStatement.check(node) ||
      j.DoWhileStatement.check(node);
  }

  function createLooseUndefinedCheck(check) {
    return j.binaryExpression('!=', check, j.literal(null));
  }

  function getBaseExpressionFromStrictTest(path) {
    return path.get('left', 'left', 'argument').value;
  }

  function getBaseExpressionFromLooseTest(path) {
    const left = path.get('left');
    if (j.AssignmentExpression.check(left.value)) {
      return left.get('right').value;
    } else {
      return left.value;
    }
  }

  function getBaseExpressionFromFunctionTest(path) {
    let argument = path.get('left', 'argument').value;

    if (j.AssignmentExpression.check(argument.object)) {
      argument = j.memberExpression(
        argument.object.right,
        argument.property
      );
    }

    return argument;
  }

  function getBaseExpressionFromTest(path) {
    if (isStrictUndefinedCheck(path.node)) {
      return getBaseExpressionFromStrictTest(path);
    } else if (isLooseUndefinedCheck(path.node)) {
      return getBaseExpressionFromLooseTest(path);
    } else {
      return getBaseExpressionFromFunctionTest(path);
    }
  }

  function hasCallExpression(expression) {
    let currentExpression = expression;

    // eslint-disable-next-line no-constant-condition
    while (currentExpression != null) {
      switch (currentExpression.type) {
      case j.MemberExpression.name:
        currentExpression = currentExpression.object;
        break;
      case j.CallExpression.name: return true;
      default: return false;
      }
    }

    return false;
  }

  function augmentMemberExpression(base, additional) {
    if (base == null) { return additional; }

    const augmenters = [];
    let currentNode = additional;

    // eslint-disable-next-line no-constant-condition
    while (true) {
      const node = currentNode;
      if (j.MemberExpression.check(node)) {
        augmenters.unshift(
          (expression) => {
            if (j.MemberExpression.check(expression) && expression.property.name === node.property.name) {
              return expression;
            } else {
              return j.memberExpression(expression, node.property, node.computed);
            }
          }
        );

        currentNode = node.object;
      } else if (j.CallExpression.check(node)) {
        augmenters.unshift(
          (expression) => j.callExpression(expression, node.arguments)
        );

        currentNode = node.callee;
      } else {
        break;
      }
    }

    return augmenters.reduce((expression, augmenter) => augmenter(expression), base);
  }

  function isFunctionCheck(node) {
    return j.match(node, {
      type: 'BinaryExpression',
      operator: '===',
      left: {type: 'UnaryExpression', operator: 'typeof'},
      right: {type: 'Literal', value: 'function'},
    });
  }

  function isLooseUndefinedCheck(node) {
    return j.match(node, {
      type: 'BinaryExpression',
      operator: '!=',
      right: isNull,
    });
  }

  function isStrictUndefinedCheck(node) {
    return j.match(node, {
      type: 'LogicalExpression',
      operator: '&&',
      left: {
        type: 'BinaryExpression',
        operator: '!==',
        left: {type: 'UnaryExpression', operator: 'typeof'},
        right: {type: 'Literal', value: 'undefined'},
      },
      right: {
        type: 'BinaryExpression',
        operator: '!==',
        right: isNull,
      },
    });
  }

  function isOffensiveConditionalTest(node) {
    return isStrictUndefinedCheck(node) || isLooseUndefinedCheck(node) || isFunctionCheck(node);
  }

  function isOffensiveConditionalExpression(path) {
    return j.match(path.node, {
      type: 'ConditionalExpression',
      test: isOffensiveConditionalTest,
      alternate: isUndefined,
    });
  }

  function isUndefined(node) {
    return j.match(node, {
      type: 'Identifier',
      name: 'undefined',
    }) || j.match(node, {
      type: 'UnaryExpression',
      operator: 'void',
      argument: {type: 'Literal', value: 0},
    });
  }

  function isNull(node) {
    return j.match(node, {type: 'Literal', value: null});
  }

  return j(source)
    .find(j.ConditionalExpression)
    .filter((path) => isOffensiveConditionalExpression(path) && !isOffensiveConditionalExpression(path.parentPath))
    .forEach(handleOffensiveConditional)
    .toSource(printOptions);
}
