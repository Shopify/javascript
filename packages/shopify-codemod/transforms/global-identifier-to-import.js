import {insertAfterDirectives, pathIsFirstMember} from './utils';

export default function globalIdentifierToImport({source}, {jscodeshift: j}, {printOptions = {}, globalIdentifiers = {}}) {
  return j(source)
    .find(j.Program)
    .forEach((path) => {
      const imports = new Set();

      function isGlobalIdentifierName(name) {
        return globalIdentifiers.hasOwnProperty(name);
      }

      function isWindow(windowPath) {
        return windowPath.get('name').value === 'window' && pathIsFirstMember(windowPath);
      }

      function isGlobalIdentifier(identifierPath) {
        return pathIsFirstMember(identifierPath) || isWindow(identifierPath.parentPath.get('object'));
      }

      j(path)
        .find(j.Identifier, {name: isGlobalIdentifierName})
        .filter(isGlobalIdentifier)
        .forEach((identifierPath) => {
          imports.add(identifierPath.node.name);

          // can only happen for window.globalIdentifier
          if (!pathIsFirstMember(identifierPath)) {
            identifierPath.parentPath.replace(identifierPath.node);
          }
        });

      const {node: {body}} = path;
      for (const anImport of imports.values()) {
        insertAfterDirectives(
          body,
          j.importDeclaration([
            j.importDefaultSpecifier(j.identifier(anImport)),
          ], j.literal(globalIdentifiers[anImport])),
        );
      }
    })
    .toSource(printOptions);
}
