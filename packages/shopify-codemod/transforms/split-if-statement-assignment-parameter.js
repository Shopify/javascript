export default function splitIfStatementAssignmentParameter({source}, {jscodeshift: j}, {printOptions = {}}) {
  const sourceAST = j(source);
  sourceAST
    .find(j.IfStatement, {
      type: j.IfStatement.name,
      test: {
        type: j.AssignmentExpression.name,
      },
    }).forEach((nodePath) => {
      const args = nodePath.get('test').node;
      nodePath.insertBefore(j.expressionStatement(args));
      nodePath.get('test').replace(args.left);

    });
  sourceAST
    .find(j.IfStatement, {
      test: {
        type: j.SequenceExpression.name,
        expressions: (expressions) => expressions.length > 1,
      },
    }).forEach((nodePath) => {
      const args = nodePath.get('test').node;
      args.expressions = args.expressions.map((assignment) => {
        let identifier = assignment;
        if (j.AssignmentExpression.check(assignment)) {
          identifier = assignment.left;
          nodePath.insertBefore(j.expressionStatement(assignment));
        }
        return identifier;
      });
    });
  return sourceAST
    .toSource(printOptions);
}
