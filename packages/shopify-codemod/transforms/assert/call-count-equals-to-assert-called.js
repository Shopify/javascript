import {createAssertion, isAssert, isMemberCall} from './utils';

export default function callCountEqualsToAssertCalled({source}, {jscodeshift: j}, {printOptions = {}}) {
  function intToCallMethodName(callCount) {
    return {
      0: 'notCalled',
      1: 'calledOnce',
      2: 'calledTwice',
      3: 'calledThrice',
    }[callCount];
  }

  const sourceAST = j(source);
  sourceAST
    .find(j.CallExpression, {
      callee: isAssert('equal', 'strictEqual', 'deepEqual'),
      arguments: {
        0: isMemberCall('callCount'),
        1: (node) => node.value >= 0 && node.value <= 3,
      },
    })
    .replaceWith(({node: {arguments: [actualArg, expectedArg]}}) => {
      const assertionName = intToCallMethodName(expectedArg.value);

      return j.callExpression(
        j.memberExpression(j.identifier('assert'), j.identifier(assertionName), false),
        [actualArg.object],
      );
    });

  return sourceAST
    .find(j.CallExpression, {
      callee: isAssert('equal', 'strictEqual', 'deepEqual'),
      arguments: {
        0: isMemberCall('callCount'),
        1: (node) =>
          j.MemberExpression.check(node) ||
          j.Identifier.check(node) ||
          (j.Literal.check(node) && isFinite(node.value)),
      },
    })
    .replaceWith(({node: {arguments: [actualArg, expectedArg]}}) =>
      createAssertion('callCount', [actualArg.object, expectedArg]),
    )
    .toSource(printOptions);
}
