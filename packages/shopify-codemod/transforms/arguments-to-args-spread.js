export default function argumentsToArgsSpread({source}, {jscodeshift: j}, {printOptions = {quote: 'single'}}) {
  function isArglessIIFE(path) {
    return j.match(path, {
      type: j.CallExpression.name,
      callee: {
        type: j.ArrowFunctionExpression.name,
        params: (params) => params.length === 0,
      },
      arguments: (args) => args.length === 0,
    });
  }

  function findNonIIFEScope(path) {
    let scope = path.scope;
    while (isArglessIIFE(scope.path.parentPath)) {
      scope = scope.parent;
    }

    return scope.path;
  }

  function isFunctionScopeWithNoParams({scope}) {
    return scope.node.params.length === 0;
  }

  function isFunctionScopeWithArgsSpread({node: {params}}) {
    return (
      j.RestElement.check(params[0]) &&
      params[0].argument.name === 'args'
    );
  }

  function hasSpreadableRootScope(path) {
    const rootScopePath = findNonIIFEScope(path);
    return isFunctionScopeWithNoParams(rootScopePath) || isFunctionScopeWithArgsSpread(rootScopePath);
  }

  function hasNoArgsVar(path) {
    return path.scope.lookup('args') == null;
  }

  const sourceAST = j(source);

  const argumentsReferences = sourceAST
    .find(j.Identifier, {name: 'arguments'})
    .filter(hasSpreadableRootScope)
    .filter(hasNoArgsVar);

  // Push `...args` into root scope param lists.
  argumentsReferences
    .map((path) => path.scope.path)
    .map(findNonIIFEScope)
    .filter(isFunctionScopeWithNoParams)
    .forEach(({node: {params}}) => {
      params.push(j.restElement(j.identifier('args')));
    });

  // Rename `arguments` => `args` in all eligible scopes.
  argumentsReferences
    .forEach((argumentsPath) => {
      argumentsPath.node.name = 'args';
    });

  return sourceAST.toSource(printOptions);
}
