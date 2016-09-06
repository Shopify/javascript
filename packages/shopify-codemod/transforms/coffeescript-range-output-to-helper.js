import {matchLast} from './utils';

const INCLUSIVE_OPERATORS = new Set(['<=', '>=']);

export default function coffeescriptRangeOutputToHelper({source}, {jscodeshift: j}, {printOptions = {}}) {
  function isCoffeeScriptRangeFunctionBody(statements) {
    const lastStatement = statements[statements.length - 1];
    const isProperReturn = j.match(lastStatement, {
      type: 'ReturnStatement',
      argument: {type: 'Identifier'},
    });

    if (!isProperReturn) { return false; }

    const storageArrayIdentifier = lastStatement.argument.name;
    const secondLastStatement = statements[statements.length - 2];

    return j.match(secondLastStatement, {
      type: 'ForStatement',
      body: {
        body: matchLast({
          type: 'ExpressionStatement',
          expression: {
            type: 'CallExpression',
            callee: {
              type: 'MemberExpression',
              object: {
                type: 'Identifier',
                name: storageArrayIdentifier,
              },
              property: {
                type: 'Identifier',
                name: 'push',
              },
            },
          },
        }),
      },
    });
  }

  return j(source)
    .find(j.CallExpression, {
      callee: {
        type: 'MemberExpression',
        property: {
          type: 'Identifier',
          name: 'apply',
        },
        object: {
          type: 'FunctionExpression',
          body: {
            body: isCoffeeScriptRangeFunctionBody,
          },
        },
      },
    })
    .replaceWith((path) => {
      const forStatement = j(path)
        .find(j.ForStatement)
        .paths()[0];

      let start;
      let end;

      const forStatementInit = forStatement.get('init');
      const forStatementDeclarations = forStatementInit.get('declarations');
      const initIsDeclaration = j.VariableDeclaration.check(forStatementInit.node);

      const forStatementTest = forStatement.get('test');
      const isComplexTest = j.ConditionalExpression.check(forStatementTest.node);

      if (initIsDeclaration) {
        const firstInitialization = forStatementDeclarations.get(0, 'init');

        if (j.AssignmentExpression.check(firstInitialization.node)) {
          start = firstInitialization.get('right');
        } else {
          start = firstInitialization;
        }
      } else {
        start = forStatementInit.get('right');
      }

      if (initIsDeclaration && forStatementDeclarations.value.length > 1) {
        end = forStatementDeclarations.get(1, 'init');
      } else if (isComplexTest) {
        end = forStatementTest.get('test', 'right');
      } else {
        end = forStatementTest.get('right');
      }

      const inclusive = INCLUSIVE_OPERATORS.has(
        isComplexTest
          ? forStatementTest.get('consequent', 'operator').value
          : forStatementTest.get('operator').value,
      );

      return j.callExpression(
        j.memberExpression(
          j.identifier('Shopify'),
          j.identifier('range'),
        ),
        [
          j.objectExpression([
            j.property('init', j.identifier('from'), start.value),
            j.property('init', j.identifier('to'), end.value),
            j.property('init', j.identifier('inclusive'), j.literal(inclusive)),
          ]),
        ],
      );
    })
    .toSource(printOptions);
}
