import {createAssertion, isAssert} from './utils';

const EQUALITY_OPERATORS = new Set(['===', '!==']);

export default function equalityComparisonsToAssertions({source}, {jscodeshift: j}, {printOptions = {}}) {
  return j(source)
    .find(j.CallExpression, {
      callee: isAssert('isTrue', 'ok'),
      arguments: {
        0: {
          type: j.BinaryExpression.name,
          operator: (op) => EQUALITY_OPERATORS.has(op),
        },
      },
    })
    .replaceWith(({node: {arguments: [comparison, ...otherArgs]}}) => {
      const assertionName = comparison.operator === '===' ? 'strictEqual' : 'notStrictEqual';

      return createAssertion(
        assertionName,
        [comparison.left, comparison.right, ...otherArgs]
      );
    })
    .toSource(printOptions);
}
