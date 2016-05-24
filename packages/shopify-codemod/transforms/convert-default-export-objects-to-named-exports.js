export default function convertDefaultExportObjectsToNamedExports({source}, {jscodeshift: j}, {printOptions = {quote: 'single'}}) {

  return j(source)
    .find(j.ExportDefaultDeclaration)
    .forEach((nodePath) => {
      const exportIndex = nodePath.parentPath.node.body.indexOf(nodePath.node);
      const body = nodePath.parentPath.value;
      const declaration = nodePath.get('declaration', 'properties').node;
      if (declaration.properties.length > 0) { delete body[exportIndex]; }
      for (const dec of declaration.properties.reverse()) {
        const exportDec = j.exportNamedDeclaration(
          j.variableDeclaration('const', [j.variableDeclarator(dec.key, dec.value)])
        );
        body.splice(exportIndex, 0, exportDec);
      }
    })
    .toSource(printOptions);
}
