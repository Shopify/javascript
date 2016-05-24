import {matchLast, isUndefined} from './utils';

export default function removeTrailingElseUndefinedReturn({source}, {jscodeshift: j}, {printOptions = {}}) {

  return j(source)
      .find(j.Function, {
        body: {
<<<<<<< HEAD
          body: matchLast(j, {
            type: 'IfStatement',
            alternate: {
              body: matchLast(j, {
=======
          body: matchLast({
            type: 'IfStatement',
            alternate: {
              body: matchLast({
>>>>>>> 01a1b7c9f036e38b029fa8d45621567fb706d64c
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
