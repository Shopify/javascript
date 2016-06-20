import {matchLast, isUndefined} from './utils';

export default function removeTrailingElseUndefinedReturn({source}, {jscodeshift: j}, {printOptions = {}}) {

  return j(source)
      .find(j.Function, {
        body: {
          body: matchLast({
            type: 'IfStatement',
            alternate: {
              body: matchLast({
                type: 'ReturnStatement',
                argument: (line) => line === null || isUndefined(line),
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
