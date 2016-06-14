import {createMemberExpressionMatcher} from './utils';

export default function avoidReturningUselessExpressions({source}, {jscodeshift: j}, {printOptions = {quote: 'single'}, methodsReturningVoid = []}) {

  const isMatchingMemberExpression = createMemberExpressionMatcher(methodsReturningVoid);

  return j(source)
    .find(j.ReturnStatement, {
      argument: {
        type: j.CallExpression.name,
        callee: isMatchingMemberExpression,
      },
    })
    .forEach((path) => {
      const arg = path.get('argument');
      path.insertBefore(j.expressionStatement(arg.node));
      arg.replace();
    })
    .toSource(printOptions);
}
