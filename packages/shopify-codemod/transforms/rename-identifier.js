import {pathIsFirstMember} from './utils';

export default function renameIdentifier({source}, {jscodeshift: j}, {printOptions = {quote: 'single'}, renameIdentifiers = {}}) {

  if (Object.keys(renameIdentifiers).length === 0) { return null; }

  return j(source)
    .find(j.Identifier, {name: (name) => renameIdentifiers.hasOwnProperty(name)})
    .filter(pathIsFirstMember)
    .replaceWith(({node: {name}}) => j.identifier(renameIdentifiers[name]))
    .toSource(printOptions);
}
