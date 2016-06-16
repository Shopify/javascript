import {createMemberExpressionMatcher} from './utils';

export default function avoidReturningUnusedResults({source}, {jscodeshift: j}, {printOptions = {quote: 'single'}, methodsThatIgnoreReturnValues = []}) {

  const isMatchingMemberExpression = createMemberExpressionMatcher(methodsThatIgnoreReturnValues);

  return j(source)
    .find(j.CallExpression, {
      callee: isMatchingMemberExpression,
      arguments: (args) => args.some(j.Function.check),
    })
    .forEach((path) => {
      path
        .get('arguments')
        .filter(({node}) => j.Function.check(node))
        .forEach((callbackPath) => {
          const {node: scopeNode} = callbackPath;

          j(path)
            .find(j.ReturnStatement)
            .filter((returnPath) => returnPath.scope.node === scopeNode)
            .forEach((returnPath) => {
              const argument = returnPath.get('argument');
              returnPath.insertBefore(j.expressionStatement(argument.node));
              argument.replace();
            });
        });
    })
    .toSource(printOptions);
}
