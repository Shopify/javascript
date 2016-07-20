import {containsThisExpression, isFunctionExpression, getBlockStatementFromFunction} from './utils';

export default function constantFunctionValueToStatement({source}, {jscodeshift: j}, {printOptions = {}}) {
  return j(source)
    .find(j.VariableDeclaration, (path) => j.match(path, {
      kind: 'const',
      declarations: [{
        type: 'VariableDeclarator',
        init: isFunctionExpression,
      }],
    }) && (path.declarations[0].init.type !== 'ArrowFunctionExpression' || !containsThisExpression(path)))
    .replaceWith((path) => {
      const declarator = path.node.declarations[0];
      const {init: {params, generator}} = declarator;

      return j.functionDeclaration(
        declarator.id,
        params,
        getBlockStatementFromFunction(declarator.init),
        generator,
        false
      );
    })
    .toSource(printOptions);
}
