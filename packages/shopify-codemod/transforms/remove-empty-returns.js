export default function removeEmptyReturns({source}, {jscodeshift: j}, {printOptions = {}}) {
  return j(source)
    .find(j.Function, {
      body: {
        body: (lines) => j.ReturnStatement.check(lines[lines.length - 1]) && lines[lines.length - 1].argument === null,
      },
    })
    .forEach(({node: {body: {body}}}) => {
      body.pop();
    })
    .toSource(printOptions);
}
