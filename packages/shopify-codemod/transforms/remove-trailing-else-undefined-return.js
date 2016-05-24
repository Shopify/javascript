import {matchLast, isUndefined} from './utils';

export default function removeTrailingElseUndefinedReturn({source}, {jscodeshift: j}, {printOptions = {}}) {

  return j(source)
      .find(j.Function, {
        body: {
          body: matchLast(j, {
            type: 'IfStatement',
            alternate: {
              body: matchLast(j, {
                type: 'ReturnStatement',
                argument: (line) => isUndefined(line),
              }),
            },
          }),
        },
      })
      .forEach(({node: {body: {body}}}) => {
        if (body[body.length - 1].alternate.body.length > 1) {
          const returnLine = body[body.length - 1].alternate.body;
          delete returnLine[returnLine.length - 1];
        } else {
          delete body[body.length - 1].alternate;
        }
      })
      .toSource(printOptions);
}
