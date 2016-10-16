import {findFirstMember, getBlockStatementFromFunction} from './utils';

export default function flattenIifeGlobalAssignment(
  {source},
  {jscodeshift: j},
  {printOptions = {}, appGlobalIdentifiers},
) {
  const root = j(source);

  function findAssignments() {
    return root
      .find(j.ExpressionStatement, {
        expression: {
          type: 'AssignmentExpression',
          operator: '=',
          left: {
            type: 'MemberExpression',
            object: (object) =>
              appGlobalIdentifiers.indexOf(findFirstMember(object).name) >= 0,
          },
          right: {
            type: 'CallExpression',
            callee: {
              type: 'FunctionExpression',
            },
          },
        },
      });
  }

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

  function flattenAssignment(path) {
    const {left: member, right: statement} = path.node.expression;
    const functionBlock = getBlockStatementFromFunction(statement.callee);

    let returnIdentifier;

    function liftNode(result, node) {
      if (node.type === 'ReturnStatement') {
        returnIdentifier = node.argument.name;
        return result;
      }

      if (!returnIdentifier) {
        result.push(node);
      } else if (nodeIsReturned(returnIdentifier, node)) {
        result.push(createIifeReturnAssignment(member, node));
      } else if (nodeIsAssignedToReturn(returnIdentifier, node)) {
        result.push(createIifeReturnMemberAssignment(member, node));
      } else {
        result.push(node);
      }

      return result;
    }

    return functionBlock.body.reverse().reduce(liftNode, []).reverse();
  }

  return findAssignments()
    .replaceWith(flattenAssignment)
    .toSource(printOptions);
}
