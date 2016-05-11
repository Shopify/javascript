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
    } else if (j.AssignmentExpression.check(parentNode)) {
      parentPath.parentPath.replace(
        j.ifStatement(
          condition,
          j.blockStatement([
            j.expressionStatement(
              j.assignmentExpression(parentNode.operator, parentNode.left, finalValue)
            ),
          ])
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
    } else if (j.BinaryExpression.check(parentNode) && !isBinaryExpressionThatMatchesUndefined(parentNode)) {
      const newBinaryExpression = j.binaryExpression(parentNode.operator, finalValue, parentNode.right);
      parentPath.replace(j.logicalExpression('&&', condition, newBinaryExpression));
    } else {
      path.replace(
        j.conditionalExpression(condition, finalValue, j.identifier('undefined'))
      );
    }
  }

  function isBinaryExpressionThatMatchesUndefined(expression) {
    return j.BinaryExpression.check(expression) &&
      (
        (expression.operator === '==' && isNull(expression.right)) ||
        ((expression.operator === '===' || expression.operator === '==') && isUndefined(expression.right))
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
