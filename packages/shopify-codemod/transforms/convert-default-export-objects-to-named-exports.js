import {
  isValidIdentifier,
  getPropertyName,
  containsThisExpression,
  isFunctionExpression,
  getBlockStatementFromFunction,
} from './utils';

export default function convertDefaultExportObjectsToNamedExports({source}, {jscodeshift: j}, {printOptions = {quote: 'single'}}) {
  function isConvertibleProperty(property) {
    return !property.computed && isValidIdentifier(getPropertyName(property)) && !containsThisExpression(property.value);
  }

  function isConvertibleObject(node) {
    return j.ObjectExpression.check(node) && node.properties.every(isConvertibleProperty);
  }

  function exportDeclarationForProperty(property) {
    const {value} = property;

    if (isFunctionExpression(value)) {
      const {params, generator} = value;
      return j.exportNamedDeclaration(
        j.functionDeclaration(
          j.identifier(getPropertyName(property)),
          params,
          getBlockStatementFromFunction(value),
          generator,
          false
        )
      );
    }

    return j.exportNamedDeclaration(
      j.variableDeclaration('const', [
        j.variableDeclarator(j.identifier(getPropertyName(property)), value),
      ])
    );
  }

  return j(source)
    .find(j.ExportDefaultDeclaration, {declaration: isConvertibleObject})
    .forEach((path) => {
      const {parentPath: {node: {body}}} = path;
      const exportIndex = body.indexOf(path.node);
      const declaration = path.get('declaration', 'properties').node;

      if (declaration.properties.length > 0) { delete body[exportIndex]; }

      for (const property of declaration.properties.reverse()) {
        body.splice(exportIndex, 0, exportDeclarationForProperty(property));
      }
    })
    .toSource(printOptions);
}
