export default function splitIfAssignments({source}, {jscodeshift: j}, {printOptions = {}}) {

  const sourceAST = j(source);

  // Handle else-ifs in reverse order (otherwise initial transforms orphan later paths).
  sourceAST.find(j.IfStatement, {
    alternate: {
      type: j.IfStatement.name,
      test: j.AssignmentExpression.check,
    },
  }).paths()
    .reverse()
    .forEach(({node}) => {
      const elseIf = node.alternate;
      const test = elseIf.test;
      node.alternate = j.blockStatement([
        j.expressionStatement(test),
        j.ifStatement(test.left, elseIf.consequent, elseIf.alternate),
      ]);
    });

  // Hoist assignments out of the first `if` and into the block body.
  return sourceAST.find(j.IfStatement, {
    test: {
      type: j.AssignmentExpression.name,
    },
  }).forEach((path) => {
    const assignment = path.get('test');
    path.insertBefore(j.expressionStatement(assignment.node));
    assignment.replace(assignment.node.left);
  }).toSource(printOptions);
}
