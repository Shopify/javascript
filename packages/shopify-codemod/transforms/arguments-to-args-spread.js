export default function argumentsToArgsSpread({source}, {jscodeshift: j}, {printOptions = {quote: 'single'}}) {
  function isArrowFunction(path) {
    return j.match(path, {
      type: j.ArrowFunctionExpression.name,
    });
  }

  function findNonArrowScope(path) {
    let scope = path.scope;
    while (isArrowFunction(scope.path)) {
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

  function hasNoArgsDeclaration({scope}) {
    return scope.lookup('args') == null;
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

      argumentsPath.node.name = rootScope.params[0].argument.name;
    })
    .toSource(printOptions);
}
