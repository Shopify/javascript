import {createAssertion, isAssert, isMemberCall} from './utils';

export default function calledWithMethodsToAssertCalledWith({source}, {jscodeshift: j}, {printOptions = {}}) {
  return j(source)
    .find(j.CallExpression, {
      callee: isAssert('isTrue', 'ok'),
      arguments: {
        0: {
          type: j.CallExpression.name,
          callee: isMemberCall('calledWith', 'calledWithMatch', 'calledWithExactly', 'neverCalledWith'),
        },
      },
    })
    .replaceWith(({node: {arguments: [callArg]}}) =>
      createAssertion(
        callArg.callee.property,
        [callArg.callee.object, ...callArg.arguments]
      )
    )
    .toSource(printOptions);
}
