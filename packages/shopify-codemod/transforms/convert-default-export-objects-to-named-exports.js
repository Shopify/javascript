export default function convertDefaultExportObjectsToNamedExports({source}, {jscodeshift: j}, {printOptions = {quote: 'single'}}) {

  return j(source)
    .find(j.ExportDefaultDeclaration)
    .forEach((nodePath) => {
      const exportIndex = nodePath.parentPath.node.body.findIndex((prop) => prop.type === 'ExportDefaultDeclaration');
      const body = nodePath.parentPath.value;
      delete body[exportIndex];
      const declarations = nodePath.node.declaration.properties;

      let addedIndex = 0;
      for (const dec of declarations) {
        const varDec = j.variableDeclarator(dec.key, dec.value);
        const varDef = j.variableDeclaration('const', [varDec]);
        const exportDec = j.exportNamedDeclaration(varDef);
        body.splice(exportIndex + addedIndex, 0, exportDec);
        addedIndex += 1;
      }
    })
    .toSource(printOptions);
}
