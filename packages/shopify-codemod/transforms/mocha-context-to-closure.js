import {MOCHA_FUNCTIONS} from './utils';

export default function mochaContextToClosure({source}, {jscodeshift: j}, {printOptions = {quote: 'single'}}) {
  let currentContext;
  const root = j(source);

  const transformableThisMemberMatcher = {
    object: {type: j.ThisExpression.name},
    property: {type: j.Identifier.name},
    computed: false,
  };

  function handleContextMember({node, scope}) {
    const propertyName = node.property.name;
    const propertyFromUpperContext = currentContext.propertyInScope(node.property);

    let newName;

    if (propertyFromUpperContext == null) {
      const declaredInScope = scope.lookup(propertyName);
      const declaredInCurrentScope = (declaredInScope === scope);
      const declaredInUpperScope = !declaredInCurrentScope && (declaredInScope != null);
      newName = declaredInUpperScope ? `${propertyName}_fromSetup` : propertyName;

      if (declaredInCurrentScope) {
        j(scope.node)
          .find(j.Identifier, {name: propertyName})
          .replaceWith(() => j.identifier(`${propertyName}_fromSetup`));
      }

      currentContext.addPropertyDescriptor({original: propertyName, name: newName});
    } else {
      newName = propertyFromUpperContext.name;
    }

    return j.identifier(newName);
  }

  function handleContextPropertyUsage({node}) {
    const contextProperty = currentContext.propertyInScope(node.property);

    if (contextProperty != null) {
      return j.identifier(contextProperty.name);
    }

    return node;
  }

  function isContextuallyAssignedFunction(functionPath) {
    return (
      j.match(functionPath, {type: 'FunctionExpression'}) &&
      j.match(functionPath.parent, {
        type: 'AssignmentExpression',
        left: transformableThisMemberMatcher,
      })
    );
  }

  function handleContextSetter(path) {
    function isScopedToSetup(otherPath) {
      const parentScope = otherPath.scope.path;
      const relevantParentPath = parentScope.parent;
      return (relevantParentPath === path) ||
        isContextuallyAssignedFunction(parentScope);
    }

    const {node} = path;

    root
      .find(j.MemberExpression, transformableThisMemberMatcher)
      .filter(isScopedToSetup)
      .replaceWith(handleContextMember);

    return j.callExpression(node.callee, node.arguments);
  }

  function handleContextUser({node}) {
    const callbackParam = node.arguments[node.arguments.length - 1];

    j(node)
      .find(j.MemberExpression, transformableThisMemberMatcher)
      .filter((memberPath) => memberPath.scope.node === callbackParam)
      .replaceWith(handleContextPropertyUsage);

    return j.callExpression(node.callee, node.arguments);
  }

  function updateFunctionWithDeclarations(oldFunction, newDeclarations) {
    const oldBody = oldFunction.body.body;
    const leadingDeclarations = takeWhile(oldBody, (statement) => statement.type === 'VariableDeclaration');
    const otherStatements = oldBody.slice(leadingDeclarations.length);

    return j.functionExpression(
      oldFunction.id,
      oldFunction.params,
      j.blockStatement([
        ...leadingDeclarations,
        ...newDeclarations,
        ...otherStatements,
      ]),
      oldFunction.generator,
      oldFunction.expression,
      oldFunction.async
    );
  }

  function handleContext(path, parentContext) {
    const context = new Context(path); // eslint-disable-line no-use-before-define
    const lastCurrentContext = currentContext;
    currentContext = context;

    if (parentContext != null) { parentContext.addContext(context); }

    function isScopedToContext(hookPath) {
      return hookPath.scope.path.parent === path;
    }

    root
      .find(j.CallExpression)
      .filter(({node}) => MOCHA_FUNCTIONS.has(node.callee.name))
      .filter(isScopedToContext)
      .replaceWith((callPath) => {
        if (setsContextProperties(callPath)) { return handleContextSetter(callPath); }
        if (usesContext(callPath)) { return handleContextUser(callPath); }
        return handleContext(callPath, context);
      });

    currentContext = lastCurrentContext;

    const newDeclarations = context
      .properties
      .map((property) => j.variableDeclaration('let', [
        j.variableDeclarator(j.identifier(property.name), null),
      ]));

    const {arguments: args} = path.node;
    args[args.length - 1] = updateFunctionWithDeclarations(
      args[args.length - 1],
      newDeclarations
    );

    return path.node;
  }

  return root
    .find(j.CallExpression)
    .filter((contextPath) => contextPath.scope.isGlobal && createsContext(contextPath))
    .replaceWith((contextPath) => handleContext(contextPath))
    .toSource(printOptions);
}

function usesContext({node}) {
  return /^(test|it|teardown|after|afterEach)$/.test(node.callee.name);
}

function createsContext({node}) {
  return /^(suite|describe|context)$/.test(node.callee.name);
}

function setsContextProperties({node}) {
  return /^(setup|before|beforeEach)$/.test(node.callee.name);
}

function takeWhile(array, condition) {
  const newArray = [];

  for (const item of array) {
    if (condition(item)) {
      newArray.push(item);
    } else {
      break;
    }
  }

  return newArray;
}

class Context {
  parent;
  properties = [];
  suites = [];

  constructor(path) {
    this.path = path;
  }

  addContext(suite) {
    suite.parent = this;
    this.suites.push(suite);
  }

  addPropertyDescriptor(propertyDescriptor) {
    this.properties.push(propertyDescriptor);
  }

  propertyInScope(property) {
    return this.properties.find((prop) => prop.original === property.name) || (this.parent && this.parent.propertyInScope(property));
  }
}
