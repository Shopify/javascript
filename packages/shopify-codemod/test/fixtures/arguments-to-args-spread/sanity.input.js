function argNamesShouldPreventSpread(arg1, arg2) {
  foo(arguments);
}

function namedParentArgsArgumentShouldPreventSpread(args) {
  console.log(args);
  (() => {
    console.log(arguments);
  })();
}

function argsVarInScopeShouldPreventSpread() {
  var args = arguments;
  console.log(args, arguments);

  (() => {
    console.log(args, arguments);
  })();
}
