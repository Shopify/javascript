import {createAssertion, isAssert} from './utils';

export default function moveLiteralsToExpectedArgument({source}, {jscodeshift: j}, {printOptions = {}}) {
  const HARDCODED_VALUE_TYPES = new Set([
    j.ArrayExpression.name,
    j.Literal.name,
    j.ObjectExpression.name,
    j.TemplateLiteral.name,
  ]);

  return j(source)
    .find(j.CallExpression, {
      callee: isAssert('equal', 'notEqual', 'strictEqual', 'notStrictEqual', 'deepEqual', 'notDeepEqual'),
      arguments: {
        0: {
          type: (type) => HARDCODED_VALUE_TYPES.has(type),
        },
        1: {
          type: (type) => !HARDCODED_VALUE_TYPES.has(type),
        },
      },
    })
    .replaceWith(({node: {callee, arguments: args}}) =>
      createAssertion(
        callee.property,
        [args[1], args[0], ...args.slice(2)]
      )
    )
    .toSource(printOptions);
}
