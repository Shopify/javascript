import {
  findFirstMember,
  getBlockStatementFromFunction,
  matchLast,
} from './utils';

export default function flattenIifeGlobalAssignment(
  {source},
  {jscodeshift: j},
  {printOptions = {}, appGlobalIdentifiers},
) {
  const root = j(source);

  function nodeIsReturned(returnIdentifier, node) {
    return node.type === 'FunctionDeclaration' && node.id.name === returnIdentifier;
  }

  function nodeIsAssignedToReturn(returnIdentifier, node) {
    return (
      returnIdentifier &&
      node.type === 'ExpressionStatement' &&
      findFirstMember(node.expression.left).name === returnIdentifier
    );
  }

  function createIifeReturnAssignment(member, node) {
    return j.expressionStatement(
      j.assignmentExpression(
        '=',
        member,
        j.functionExpression(member.property, node.params, node.body),
      ),
    );
  }

  function createIifeReturnMemberAssignment(member, node) {
    return j.expressionStatement(
      j.assignmentExpression(
        node.expression.operator,
        formatReturnAssignmentMemberExpression(node.expression.left, member),
        node.expression.right,
      ),
    );
  }

  function formatReturnAssignmentMemberExpression(memberExpression, prependee) {
    const identifiers = [];
    let currentNode = memberExpression;

    // Take all but the last, which is copied from the base memberExpression
    while (currentNode.type === 'MemberExpression') {
      identifiers.push(currentNode.property);
      currentNode = currentNode.object;
    }

    let newExpression = prependee;

    while (identifiers.length) {
      newExpression = j.memberExpression(newExpression, identifiers.pop());
    }

    return newExpression;
  }

  return root
    .find(j.ExpressionStatement, {
      expression: {
        type: 'AssignmentExpression',
        operator: '=',
        left: {
          type: 'MemberExpression',
          object: (object) => appGlobalIdentifiers.indexOf(findFirstMember(object).name) >= 0,
        },
        right: {
          type: 'CallExpression',
          callee: {
            type: 'FunctionExpression',
            body: {
              body: matchLast({type: 'ReturnStatement'}),
            },
          },
        },
      },
    })
    .replaceWith((path) => {
      const {left: member, right: statement} = path.node.expression;
      const functionBlock = getBlockStatementFromFunction(statement.callee);
      const returnIdentifier = functionBlock.body.pop().argument.name;

      return functionBlock.body.map((node) => {
        if (nodeIsReturned(returnIdentifier, node)) {
          return createIifeReturnAssignment(member, node);
        } else if (nodeIsAssignedToReturn(returnIdentifier, node)) {
          return createIifeReturnMemberAssignment(member, node);
        }
        return node;
      });
    })
    .toSource(printOptions);
}
