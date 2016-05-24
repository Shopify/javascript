import {matchLast} from './utils';

export default function removeEmptyReturns({source}, {jscodeshift: j}, {printOptions = {}}) {
  const sourceAST = j(source);
  sourceAST
    .find(j.IfStatement, {
      alternate: {
        body: [{
          type: 'ExpressionStatement',
          expression: {
            type: 'UnaryExpression',
            operator: 'void',
          },
        }],
      },
    })
    .forEach(({node}) => {
      delete node.alternate;
    });

  return sourceAST
    .find(j.Function, {
      body: {
        body: matchLast({
          type: 'ReturnStatement',
          argument: null,
        }),
      },
    })
    .forEach(({node: {body: {body}}}) => {
      body.pop();
    })
    .toSource(printOptions);
}
