import {matchLast} from './utils';

export default function splitReturnAssignments({source}, {jscodeshift: j}, {printOptions = {}}) {
  return j(source)
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

      const {left, right} = body.pop().argument;
      body.pop();
      body.push({
        type: 'ExpressionStatement',
        expression: {
          type: 'AssignmentExpression',
          operator: '=',
          left,
          right,
        },
      });
      body.push({
        type: 'ReturnStatement',
        argument: left,
      });

    })
    .toSource(printOptions);
}
