import {createAssertion, isAssert, isMemberCall} from './utils';

export default function calledEqualsBooleanToAssertCalled({source}, {jscodeshift: j}, {printOptions = {}}) {
  return j(source)
    .find(j.CallExpression, {
      callee: isAssert('deepEqual', 'equal', 'strictEqual'),
      arguments: {
        0: isMemberCall('called', 'notCalled'),
        1: (node) => node.value === true || node.value === false,
      },
    })
    .replaceWith(({node: {arguments: [actualArg, expectedArg]}}) => {
      const isPositiveAssertion = (actualArg.property.name === 'called');
      const isPositiveExpectation = expectedArg.value;
      const newAssertName = (isPositiveAssertion === isPositiveExpectation)
        ? 'called'
        : 'notCalled';

      return createAssertion(newAssertName, [actualArg.object]);
    })
    .toSource(printOptions);
}
