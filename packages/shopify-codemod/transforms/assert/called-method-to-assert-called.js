import {createAssertion, isAssert, isMemberCall} from './utils';

export default function calledMethodToAssertCalled({source}, {jscodeshift: j}, {printOptions = {}}) {
  function invertCalledAssertionName(methodName) {
    return methodName === 'called' ? 'notCalled' : 'called';
  }

  const sourceAST = j(source);
  sourceAST
    .find(j.CallExpression, {
      callee: isAssert('isFalse', 'notOk'),
      arguments: {
        0: isMemberCall('called', 'notCalled'),
      },
    })
    .replaceWith(({node: {arguments: [callArg]}}) =>
      createAssertion(
        invertCalledAssertionName(callArg.property.name),
        [callArg.object],
      ),
    );

  return sourceAST
    .find(j.CallExpression, {
      callee: isAssert('isTrue', 'ok'),
      arguments: {
        0: isMemberCall('called', 'calledOnce', 'calledTwice', 'calledThrice', 'notCalled'),
      },
    })
    .replaceWith(({node: {arguments: [callArg]}}) =>
      createAssertion(callArg.property, [callArg.object]),
    )
    .toSource(printOptions);
}
