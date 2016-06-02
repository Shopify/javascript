export default function removeEmptyCatchBlocks({source}, {jscodeshift: j}, {printOptions = {}}) {

  return j(source)
    .find(j.TryStatement, {
      type: 'TryStatement',
      handler: {
        type: 'CatchClause',
      },
    })
      .forEach(({node}) => {
        if (node.handler.body.body.length === 0) {
          delete node.handler;
        }
      })
    .toSource(printOptions);
}
