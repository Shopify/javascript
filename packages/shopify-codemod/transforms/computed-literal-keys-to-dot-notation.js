import {isValidIdentifier} from './utils';

export default function computedLiteralKeysToDotNotation({source}, {jscodeshift: j}, {printOptions = {quote: 'single'}}) {

  return j(source)
    .find(j.MemberExpression, {
      property: {
        type: j.Literal.name,
        value: isValidIdentifier,
      },
    })
    .forEach((path) => {
      const {node: {property: {value}}} = path;
      path.get('computed').replace(false);
      path.get('property').replace(j.identifier(value));
    })
    .toSource(printOptions);
}
