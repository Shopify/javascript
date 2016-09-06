import {MOCHA_FUNCTIONS} from './utils';

export default function mochaContextToGlobalReference({source}, {jscodeshift: j}, {printOptions = {}, testContextToGlobals = {}}) {
  const propMapping = Object.keys(testContextToGlobals).reduce((map, testGlobal) => {
    const testGlobalDetails = testContextToGlobals[testGlobal];
    testGlobalDetails.properties.forEach((prop) => {
      map[prop] = {identifier: j.identifier(testGlobal), replace: Boolean(testGlobalDetails.replace)};
    });
    return map;
  }, {});

  return j(source)
    .find(j.CallExpression, {
      callee: {
        type: 'Identifier',
        name: (name) => MOCHA_FUNCTIONS.has(name),
      },
    })
    .forEach((path) => {
      j(path)
        .find(j.MemberExpression, {
          object: {
            type: 'ThisExpression',
          },
          property: {
            type: 'Identifier',
            name: (name) => propMapping.hasOwnProperty(name),
          },
        })
        .replaceWith((memberPath) => {
          const propDetails = propMapping[memberPath.get('property').node.name];
          if (propDetails.replace) {
            return propDetails.identifier;
          } else {
            return j.memberExpression(
              propDetails.identifier,
              memberPath.get('property').node,
            );
          }
        });
    })
    .toSource(printOptions);
}
