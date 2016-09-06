import {findFirstMember, insertAfterDirectives} from './utils';

export default function globalAssignmentToDefaultExport({source}, {jscodeshift: j}, {printOptions = {}, appGlobalIdentifiers}) {
  function removeFirstMember(memberExpression) {
    j(memberExpression)
      .find(j.MemberExpression, {
        object: (node) => !j.MemberExpression.check(node),
      })
      .forEach((path) => path.replace(path.node.property));

    return memberExpression;
  }

  function isDefaultExportMemberAssignment(defaultExportName, assignmentTargetString) {
    return new RegExp(`^${defaultExportName}\..+`).test(assignmentTargetString);
  }

  return j(source)
    .find(j.Program)
    .forEach((programPath) => {
      let expose;

      j(programPath)
        .find(j.ExpressionStatement, {
          expression: {
            type: 'AssignmentExpression',
            operator: '=',
            left: {
              type: 'MemberExpression',
              object: (object) => appGlobalIdentifiers.indexOf(findFirstMember(object).name) >= 0,
            },
          },
        })
        .replaceWith((path) => {
          const expression = path.node.expression;
          const {left: member, right: statement} = expression;

          if (expose == null) {
            expose = j(member).toSource();
            return j.exportDefaultDeclaration(statement);
          } else {
            const newExpose = j(member).toSource();

            if (!isDefaultExportMemberAssignment(expose, newExpose)) {
              throw new Error('Found multiple exports in a single file, please break up the file first');
            }

            const {left, right} = path.node.expression;

            return j.expressionStatement(
              j.assignmentExpression(
                expression.operator,
                removeFirstMember(left),
                right,
              ),
            );
          }
        });

      if (expose != null) {
        const {node: {body}} = programPath;
        insertAfterDirectives(
          body,
          j.expressionStatement(j.literal(`expose ${expose}`)),
        );
      }
    })
    .toSource(printOptions);
}
