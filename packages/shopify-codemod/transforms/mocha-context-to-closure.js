'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = mochaContextToClosure;

var _takeWhile = require('lodash/takeWhile');

var _takeWhile2 = _interopRequireDefault(_takeWhile);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function mochaContextToClosure(_ref, _ref2) {
  var source = _ref.source;
  var j = _ref2.jscodeshift;

  var currentContext = void 0;
  var root = j(source);

  function handleContextMember(_ref3) {
    var node = _ref3.node;
    var scope = _ref3.scope;

    var propertyName = node.property.name;

    var propertyFromUpperContext = currentContext.propertyInScope(node.property);

    var newName = void 0;

    if (propertyFromUpperContext != null) {
      newName = propertyFromUpperContext.name;
    } else {
      var declaredInScope = scope.lookup(propertyName);
      var declaredInCurrentScope = declaredInScope === scope;
      var declaredInUpperScope = !declaredInCurrentScope && declaredInScope != null;
      newName = declaredInUpperScope ? propertyName + '_fromSetup' : propertyName;

      if (declaredInCurrentScope) {
        j(scope.node).find(j.Identifier, { name: propertyName }).replaceWith(function () {
          return j.identifier(propertyName + '_fromSetup');
        });
      }

      currentContext.addPropertyDescriptor({ original: propertyName, name: newName });
    }

    return j.identifier(newName);
  }

  function handleContextPropertyUsage(_ref4) {
    var node = _ref4.node;

    var contextProperty = currentContext.propertyInScope(node.property);

    if (contextProperty != null) {
      return j.identifier(contextProperty.name);
    }

    return node;
  }

  function handleContextSetter(path) {
    function isScopedToSetup(otherPath) {
      return otherPath.scope.path.parent === path;
    }

    var node = path.node;


    root.find(j.MemberExpression, { object: { type: 'ThisExpression' } }).filter(isScopedToSetup).replaceWith(handleContextMember);

    return j.callExpression(node.callee, arrowifyCallbackInParams(node.arguments));
  }

  function handleContextUser(_ref5) {
    var node = _ref5.node;

    var callbackParam = node.arguments[node.arguments.length - 1];

    j(node).find(j.MemberExpression, { object: { type: 'ThisExpression' } }).filter(function (memberPath) {
      return memberPath.scope.node === callbackParam;
    }).replaceWith(handleContextPropertyUsage);

    return j.callExpression(node.callee, arrowifyCallbackInParams(node.arguments));
  }

  function updateFunctionWithDeclarations(oldFunction, newDeclarations) {
    var oldBody = oldFunction.body.body;
    var leadingDeclarations = (0, _takeWhile2.default)(oldBody, function (statement) {
      return statement.type === 'VariableDeclaration';
    });
    var otherStatements = oldBody.slice(leadingDeclarations.length);

    return j.functionExpression(oldFunction.id, oldFunction.params, j.blockStatement([].concat(_toConsumableArray(leadingDeclarations), _toConsumableArray(newDeclarations), _toConsumableArray(otherStatements))), oldFunction.generator, oldFunction.expression, oldFunction.async);
  }

  function arrowifyFunction(oldFunction) {
    if (oldFunction == null || oldFunction.type !== 'FunctionExpression') {
      return oldFunction;
    }

    return j.arrowFunctionExpression(oldFunction.params, oldFunction.body, oldFunction.generator, oldFunction.expression, oldFunction.async);
  }

  function arrowifyCallbackInParams(params) {
    var otherParams = [].concat(_toConsumableArray(params));
    var callback = arrowifyFunction(otherParams.pop());
    return [].concat(_toConsumableArray(otherParams), [callback]);
  }

  function handleContext(path, parentContext) {
    var context = new Context(path); // eslint-disable-line no-use-before-define
    var lastCurrentContext = currentContext;
    currentContext = context;

    if (parentContext != null) {
      parentContext.addContext(context);
    }

    function isScopedToContext(hookPath) {
      return hookPath.scope.path.parent === path;
    }

    root.find(j.CallExpression).filter(isScopedToContext).replaceWith(function (callPath) {
      if (setsContextProperties(callPath)) {
        return handleContextSetter(callPath);
      }
      if (usesContext(callPath)) {
        return handleContextUser(callPath);
      }
      return handleContext(callPath, context);
    });

    currentContext = lastCurrentContext;

    var newDeclarations = context.properties.map(function (property) {
      return j.variableDeclaration('let', [j.variableDeclarator(j.identifier(property.name), null)]);
    });

    var args = path.node.arguments;

    args[args.length - 1] = arrowifyFunction(updateFunctionWithDeclarations(args[args.length - 1], newDeclarations));

    return path.node;
  }

  return root.find(j.CallExpression).filter(function (contextPath) {
    return contextPath.scope.isGlobal && createsContext(contextPath);
  }).replaceWith(function (contextPath) {
    return handleContext(contextPath);
  }).toSource({ quote: 'single' });
}

function usesContext(_ref6) {
  var node = _ref6.node;

  return (/^(test|it|teardown|after|afterEach)$/.test(node.callee.name)
  );
}

function createsContext(_ref7) {
  var node = _ref7.node;

  return (/^(suite|describe|context)$/.test(node.callee.name)
  );
}

function setsContextProperties(_ref8) {
  var node = _ref8.node;

  return (/^(setup|before|beforeEach)$/.test(node.callee.name)
  );
}

var Context = function () {
  function Context(path) {
    _classCallCheck(this, Context);

    this.path = path;
    this.properties = [];
    this.parent = null;
    this.suites = [];
  }

  _createClass(Context, [{
    key: 'addContext',
    value: function addContext(suite) {
      suite.parent = this;
      this.suites.push(suite);
    }
  }, {
    key: 'addPropertyDescriptor',
    value: function addPropertyDescriptor(propertyDescriptor) {
      this.properties.push(propertyDescriptor);
    }
  }, {
    key: 'propertyInScope',
    value: function propertyInScope(property) {
      return this.properties.find(function (prop) {
        return prop.original === property.name;
      }) || this.parent && this.parent.propertyInScope(property);
    }
  }]);

  return Context;
}();