import {matchLast} from './utils';

export default function removeReturnVoids({source}, {jscodeshift: j}, {printOptions = {}}) {

  return j(source)
    .find(j.Function, {
      body: {
        body: matchLast(j, {
          type: 'IfStatement',
          alternate: {
            body: matchLast(j, {
              type: 'ReturnStatement',
            }),
          },
        }),
      },
    })
    .filter(({node: {body: {body}}}) => {
      const ifBlock = body[body.length - 1].alternate.body;
      const returnStatement = ifBlock[ifBlock.length - 1];
      let isUndefined = false;
      if (
      returnStatement.argument.operator === 'void' && returnStatement.argument.argument.raw === '0' ||
      returnStatement.argument.name === 'undefined'
      ) {
        isUndefined = true;
      }
      return isUndefined;
    })
    .forEach(({node: {body: {body}}}) => {
      delete body[body.length - 1].alternate;
    })
    .toSource(printOptions);
}
