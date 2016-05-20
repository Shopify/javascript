import {matchLast} from './utils';

export default function removeEmptyReturns({source}, {jscodeshift: j}, {printOptions = {}}) {
  return j(source)
    .find(j.Function, {
      body: {
        body: matchLast({
          type: 'ReturnStatement',
          argument: null,
        }),
      },
    })
    .forEach(({node: {body: {body}}}) => {
      body.pop();
    })
    .toSource(printOptions);
}
