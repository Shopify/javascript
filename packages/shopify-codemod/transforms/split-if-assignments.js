export default function splitIfAssignments({source}, {jscodeshift: j}, {printOptions = {}}) {
  return j(source)
    .find(j.IfStatement, {
      test: {
        type: j.AssignmentExpression.name,
      },
    }).forEach((path) => {
      const assignment = path.get('test');
      path.insertBefore(j.expressionStatement(assignment.node));
      assignment.replace(assignment.node.left);
    })
    .toSource(printOptions);
}
