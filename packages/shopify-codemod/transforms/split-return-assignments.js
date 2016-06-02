import {matchLast, forEachAssignment} from './utils';

export default function splitReturnAssignments({source}, {jscodeshift: j}, {printOptions = {}}) {
  const sourceAST = j(source);
  sourceAST
    .find(j.Function, {
      body: {
        body: matchLast(j.ReturnStatement, {
          type: 'ReturnStatement',
          argument: j.AssignmentExpression,
        }),
      },
    })
    .forEach(({node: {body: {body}}}) => {
      const returnLine = body[body.length - 1];
      forEachAssignment(body[body.length - 1].argument, (assignment) => {
        body.splice(body.indexOf(returnLine) + 1, 0, j.expressionStatement(assignment));
      });
      delete body[body.indexOf(returnLine)];
      body.push(j.returnStatement(returnLine.argument.left));
    });
  sourceAST
    .find(j.ExpressionStatement, {
      type: 'ExpressionStatement',
      expression: {
        type: 'CallExpression',
        arguments: [
          {
            type: 'ArrowFunctionExpression',
            body: {
              type: 'AssignmentExpression',
              operator: '=',
            },
          },
        ],
      },
    }).forEach(({node: {expression}}) => {
      const {left, right} = expression.arguments[0].body;

      forEachAssignment(expression.arguments[0].body, () => {
        expression.arguments[0].body = j.blockStatement([]);
        expression.arguments[0].body.body.push(
          j.expressionStatement(
            j.assignmentExpression('=', left, right)
        ));
        expression.arguments[0].body.body.push(j.returnStatement(left));
      });
    });

  return sourceAST
    .toSource(printOptions);
}
