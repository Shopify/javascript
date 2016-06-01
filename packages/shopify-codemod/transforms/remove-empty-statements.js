export default function removeEmptyStatements({source}, {jscodeshift: j}, {printOptions = {quote: 'single'}}) {
  return j(source)
    .find(j.EmptyStatement)
    .replaceWith()
    .toSource(printOptions);
}
