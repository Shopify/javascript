import {findFirstMember, insertAfterDirectives} from './utils';

export default function globalAssignmentToDefaultExport({source}, {jscodeshift: j}, {printOptions = {}, appGlobalIdentifiers}) {
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
          const {
            node: {
              expression: {
                left: member,
                right: statement,
              },
            },
          } = path;

          if (expose == null) {
            expose = j(member).toSource();
            return j.exportDefaultDeclaration(statement);
          } else {
            const newExpose = j(member).toSource();
            if (newExpose.indexOf(`${expose}.prototype.`) !== 0) {
              throw new Error('Found multiple exports in a single file, please break up the file first');
            }

            const {left, right} = path.node.expression;
            return j.expressionStatement(
              j.assignmentExpression(
                '=',
                j.memberExpression(
                  j.memberExpression(left.object.object.property, left.object.property),
                  left.property
                ),
                right
              )
            );
          }
        });

      if (expose != null) {
        const {node: {body}} = programPath;
        insertAfterDirectives(
          body,
          j.expressionStatement(j.literal(`expose ${expose}`))
        );
      }
    })
    .toSource(printOptions);
}
