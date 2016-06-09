import {matchLast} from './utils';

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
    .forEach((nodePath) => {
      const body = nodePath.get('body', 'body');
      const original = body.pop();
      body.push(j.expressionStatement(original.argument));
      body.push(j.returnStatement(original.argument.left));
    });
  sourceAST
    .find(j.Function, {
      body: {
        type: 'AssignmentExpression',
      },
    })
    .forEach((nodePath) => {
      const body = nodePath.get('body');
      body.replace(j.blockStatement([
        j.expressionStatement(body.node),
        j.returnStatement(body.node.left),
      ]));
    });
  return sourceAST
    .toSource(printOptions);
}
