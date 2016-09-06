import {createAssertion, isAssert} from './utils';

export default function assertFalseToAssertFail({source}, {jscodeshift: j}, {printOptions = {}}) {
  function isStringArgument(argument) {
    return argument != null && (typeof argument.value === 'string' || j.TemplateLiteral.check(argument));
  }

  return j(source)
    .find(j.CallExpression, {
      callee: (callee) => callee.name === 'assert' || isAssert('ok'),
      arguments: (args) =>
        args.length === 2 &&
        args[0].value === false &&
        isStringArgument(args[1]),
    })
    .replaceWith(({node: {arguments: [, failMessage]}}) =>
      createAssertion('fail', [failMessage]),
    )
    .toSource(printOptions);
}
