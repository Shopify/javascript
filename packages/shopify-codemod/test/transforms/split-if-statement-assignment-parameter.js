import {forEachAssignment} from './utils';

export default function splitIfStatementAssignmentParameter({source}, {jscodeshift: j}, {printOptions = {}}) {
  const sourceAST = j(source);
  sourceAST
    .find(j.IfStatement, {
      type: j.IfStatement.name,
      test: {
        type: j.AssignmentExpression.name,
      },
    }).forEach((nodePath) => {
      const {node: {test: params}} = nodePath;
      forEachAssignment(params, () => {
        nodePath.get('test').replace(j.identifier(params.left.name));
        nodePath.insertBefore(j.expressionStatement(params));
      });
    });
  sourceAST
    .find(j.IfStatement, {
      test: {
        type: j.SequenceExpression.name,
        expressions: (expressions) => expressions.length > 1,
      },
    }).forEach((nodePath) => {
      for (const params of Array.from(nodePath.node.test.expressions)) {
        forEachAssignment(params, () => {
          nodePath.get('test').replace(j.identifier(params.left.name));
          nodePath.insertBefore(j.expressionStatement(params));
        });
      }
    });
  return sourceAST
    .toSource(printOptions);
}
