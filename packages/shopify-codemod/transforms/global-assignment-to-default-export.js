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
          } else {
            throw new Error('Found multiple exports in a single file, please break up the file first');
          }
          return j.exportDefaultDeclaration(statement);
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
