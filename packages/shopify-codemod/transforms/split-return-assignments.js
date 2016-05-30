import {matchLast} from './utils';

export default function splitReturnAssignments({source}, {jscodeshift: j}, {printOptions = {}}) {
  const sourceAST = j(source);
  sourceAST
    .find(j.Function, {
      body: {
        body: matchLast(j.ReturnStatement, {
          type: 'ReturnStatement',
          argument: {
            type: 'AssignmentExpression',
          },
        }),
      },
    })
    .forEach(({node: {body: {body}}}) => {
      const {left, right} = body[body.length - 1].argument;
      const returnLine = body[body.length - 1];
      if (returnLine.argument.left) {
        delete body[body.length - 1];
        body.push({
          type: 'ExpressionStatement',
          expression: {
            type: 'AssignmentExpression',
            operator: '=',
            left,
            right,
          },
        });

        if (returnLine.argument.left.name) {
          body.push({
            type: 'ReturnStatement',
            argument: {
              type: 'Identifier',
              name: returnLine.argument.left.name,
            },
          });
        } else {
          body.push({
            type: 'ReturnStatement',
            computed: false,
            argument: {
              type: 'MemberExpression',
              object: returnLine.argument.left.object,
              property: returnLine.argument.left.property,
            },
          });
        }
      } else {
        body.push({
          type: 'ExpressionStatement',
          expression: {
            type: 'AssignmentExpression',
            operator: '=',
            left: {
              type: 'MemberExpression',
              object: returnLine.argument.object,
              property: returnLine.argument.property,
            },
            right: {
              type: 'MemberExpression',
              object: returnLine.argument.object,
              property: returnLine.argument.property,
            },
          },
        });
      }
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
      expression.arguments[0].body = {
        type: 'BlockStatement',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'AssignmentExpression',
              operator: '=',
              left,
              right,
            },
          },
          {
            type: 'ReturnStatement',
            argument: {
              type: 'Identifier',
              name: left.name,
            },
          },
        ],
      };
    });

  return sourceAST
    .toSource(printOptions);
}
