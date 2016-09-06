import j from 'jscodeshift';

export function createAssertion(assertionNameOrProperty, args) {
  const assertionName = (assertionNameOrProperty.name == null)
    ? assertionNameOrProperty
    : assertionNameOrProperty.name;

  return j.callExpression(
    j.memberExpression(j.identifier('assert'), j.identifier(assertionName), false),
    args,
  );
}

export function isAssert(...validAssertionNames) {
  return {
    object: {
      name: 'assert',
    },
    property: {
      name: (name) => validAssertionNames.indexOf(name) > -1,
    },
  };
}

export function isMemberCall(...propertyNames) {
  return {
    type: j.MemberExpression.name,
    property: {
      name: (name) => propertyNames.indexOf(name) > -1,
    },
  };
}
