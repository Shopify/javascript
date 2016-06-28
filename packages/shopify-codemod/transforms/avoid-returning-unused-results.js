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
            .filter((returnPath) => (
              (returnPath.scope.node === scopeNode) &&
              (returnPath.node.argument != null)
            ))
            .forEach((returnPath) => {
              const argument = returnPath.get('argument');
              returnPath.insertAfter(j.returnStatement(null));
              returnPath.replace(j.expressionStatement(argument.node));
            });
        });
    })
    .toSource(printOptions);
}
