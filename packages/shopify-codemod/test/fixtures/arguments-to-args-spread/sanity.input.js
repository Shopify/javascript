function argNamesShouldPreventSpread(arg1, arg2) {
  foo(arguments);
}

function arrowIIFEParentWithArgs(arg1) {
  console.log(arguments);
  (() => {
    console.log("iife1", arguments);
  })();
}

function namedArgsArgumentShouldPreventSpread(args) {
  console.log(args);
}

function argsVarInScopeShouldPreventSpread() {
  var args = arguments;
  console.log(args, arguments);
}

function argsVarInScopeShouldPreventSpread() {
  var args = arguments;
  (() => {
    console.log(args, arguments);
  })();
}
