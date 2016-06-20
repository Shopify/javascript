export default function argumentsToArgsSpread({source}, {jscodeshift: j}, {printOptions = {quote: 'single'}}) {
  function findNonArrowScope(path) {
    let scope = path.scope;
    while (j.ArrowFunctionExpression.check(scope.node)) {
      scope = scope.parent;
    }

    return scope.path;
  }

  function hasSpreadableRootScope(path) {
    const rootScope = findNonArrowScope(path);
    return (
      rootScope.node.params.length === 0 ||
      j.RestElement.check(rootScope.node.params[0])
    );
  }

  function hasNoArgsDeclaration(path) {
    return !findNonArrowScope(path).scope.declares('args');
  }

  return j(source)
    .find(j.Identifier, {name: 'arguments'})
    .filter(hasSpreadableRootScope)
    .filter(hasNoArgsDeclaration)
    .forEach((argumentsPath) => {
      const rootScope = findNonArrowScope(argumentsPath).node;
      if (rootScope.params.length === 0) {
        rootScope.params = [j.restElement(j.identifier('args'))];
      }

      argumentsPath.replace(rootScope.params[0].argument);
    })
    .toSource(printOptions);
}
