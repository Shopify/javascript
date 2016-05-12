import {createAssertion} from './utils';

export default function assertToAssertOk({source}, {jscodeshift: j}, {printOptions = {}}) {
  return j(source)
    .find(j.CallExpression, {
      callee: {
        type: j.Identifier.name,
        name: 'assert',
      },
    })
    .replaceWith(({node}) =>
      createAssertion('ok', node.arguments)
    )
    .toSource(printOptions);
}
