import {pathIsFirstMember, isValidIdentifier} from './utils';

export default function renameProperty({source}, {jscodeshift: j}, {printOptions = {quote: 'single'}, renameProperties = {}}) {
  function hasPropertyThatShouldBeRenamed({node: {computed, object, property}}) {
    return !computed && renameProperties[object.name].hasOwnProperty(property.name);
  }

  if (Object.keys(renameProperties).length === 0) { return null; }

  return j(source)
    .find(j.MemberExpression, {object: {name: (name) => renameProperties.hasOwnProperty(name)}})
    .filter((path) => pathIsFirstMember(path) && hasPropertyThatShouldBeRenamed(path))
    .forEach((path) => {
      const {node: {object, property}} = path;
      const newName = renameProperties[object.name][property.name];
      const newNameIsValidIdentifier = isValidIdentifier(newName);
      path.get('property').replace(
        newNameIsValidIdentifier ? j.identifier(newName) : j.literal(newName),
      );
      path.get('computed').replace(!newNameIsValidIdentifier);
    })
    .toSource(printOptions);
}
