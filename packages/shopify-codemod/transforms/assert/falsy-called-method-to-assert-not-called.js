import {createAssertion, isAssert, isMemberCall} from './utils';

export default function falsyCalledMethodToAssertNotCalled({source}, {jscodeshift: j}, {printOptions = {}}) {
  function invertCalledAssertionName(assertionName) {
    return {
      called: 'notCalled',
      calledWith: 'neverCalledWith',
      calledWithMatch: 'neverCalledWithMatch',
    }[assertionName];
  }

  return j(source)
    .find(j.CallExpression, {
      callee: isAssert('notOk', 'isFalse'),
      arguments: {
        0: {
          type: j.CallExpression.name,
          callee: isMemberCall('calledWith', 'calledWithMatch'),
        },
      },
    })
    .replaceWith(({node: {arguments: [{callee, arguments: callArgs}]}}) =>
      createAssertion(
        invertCalledAssertionName(callee.property.name),
        [callee.object, ...callArgs],
      ),
    )
    .toSource(printOptions);
}
