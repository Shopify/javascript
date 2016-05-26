import {pathIsFirstMember} from './utils';

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
      path.get('property').replace(j.identifier(renameProperties[object.name][property.name]));
    })
    .toSource(printOptions);
}
