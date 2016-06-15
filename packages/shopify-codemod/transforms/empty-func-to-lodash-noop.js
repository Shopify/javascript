export default function emptyFuncToLodashNoop({source}, {jscodeshift: j}, {printOptions = {quote: 'single'}}) {
  const noop = j.memberExpression(j.identifier('_'), j.identifier('noop'), false);

  return j(source)
    .find(j.Function, {body: {body: (body) => body.length === 0}})
    .filter(({node}) => !j.FunctionDeclaration.check(node))
    .forEach((path) => {
      const {parentPath} = path;
      const {node: parentNode} = parentPath;

      if (j.MethodDefinition.check(parentNode)) {
        if (!parentNode.computed) {
          parentPath.replace(j.classProperty(parentNode.key, noop, null));
        }

        return;
      } else if (j.Property.check(parentNode)) {
        parentNode.method = false;
      }

      path.replace(noop);
    })
    .toSource(printOptions);
}
