import {insertAfterDirectives} from './utils';

export default function globalIdentifierToImport({source}, {jscodeshift: j}, {printOptions = {}, globalIdentifiers = {}}) {
  return j(source)
    .find(j.Program)
    .forEach((path) => {
      const imports = new Set();

      function isGlobalIdentifierName(name) {
        return globalIdentifiers.hasOwnProperty(name);
      }

      function isWindow(windowPath) {
        return windowPath.get('name').value === 'window' && !isNestedInMemberExpression(windowPath);
      }

      function isNestedInMemberExpression(aPath) {
        const parentNode = aPath.parentPath.node;
        return j.MemberExpression.check(parentNode) && parentNode.property === aPath.node;
      }

      function isGlobalIdentifier(identifierPath) {
        return !isNestedInMemberExpression(identifierPath) || isWindow(identifierPath.parentPath.get('object'));
      }

      j(path)
        .find(j.Identifier, {name: isGlobalIdentifierName})
        .filter(isGlobalIdentifier)
        .forEach((identifierPath) => {
          imports.add(identifierPath.node.name);

          // can only happen for window.globalIdentifier
          if (isNestedInMemberExpression(identifierPath)) {
            identifierPath.parentPath.replace(identifierPath.node);
          }
        });

      const {node: {body}} = path;
      for (const anImport of imports.values()) {
        insertAfterDirectives(
          body,
          j.importDeclaration([
            j.importDefaultSpecifier(j.identifier(anImport)),
          ], j.literal(globalIdentifiers[anImport]))
        );
      }
    })
    .toSource(printOptions);
}
