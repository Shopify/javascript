export default function catchUndefinedToCatchError({source}, {jscodeshift: j}, {printOptions = {quote: 'single'}}) {
  function hasNoErrorReferences(path) {
    const usage = j(path).find(j.Identifier, {name: 'error'});

    return usage.size() === 0;
  }

  return j(source)
    .find(j.CatchClause, {
      param: {
        name: 'undefined',
      },
    })
    .filter(hasNoErrorReferences)
    .forEach(({node: {param}}) => { param.name = 'error'; })
    .toSource(printOptions);
}
