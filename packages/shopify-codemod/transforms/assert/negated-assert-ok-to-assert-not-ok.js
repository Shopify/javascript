import {createAssertion, isAssert} from './utils';

export default function negatedAssertOkToAssertNotOk({source}, {jscodeshift: j}, {printOptions = {}}) {
  return j(source)
    .find(j.CallExpression, {
      callee: isAssert('ok'),
      arguments: {
        0: {
          type: j.UnaryExpression.name,
          operator: '!',
        },
      },
    })
    .replaceWith(({node: {arguments: [negation, ...otherArgs]}}) =>
      createAssertion('notOk', [negation.argument, ...otherArgs])
    )
    .toSource(printOptions);
}
