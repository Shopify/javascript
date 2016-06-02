export default function removeEmptyCatchBlocks({source}, {jscodeshift: j}, {printOptions = {}}) {
  return j(source)
    .find(j.TryStatement, {
      type: j.TryStatement.name,
      handler: {
        type: j.CatchClause.name,
        body: {
          body: (body) => body.length === 0,
        },
      },
    })
    .forEach((nodePath) => {
      nodePath.get('handler').replace();
    })
    .toSource(printOptions);
}
