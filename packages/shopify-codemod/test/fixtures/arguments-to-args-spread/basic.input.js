function shouldGetArgsSpread() {
  foo(arguments);
}

function shouldGetArgsSpread() {
  foo(...arguments);
}

function shouldGetArgsSpread() {
  foo(() => {
    console.log(arguments);
  });
}

function noArgsSpread() {
  function shouldGetArgsSpread() {
    console.log(arguments);
  }
}

function arrowIIFEParentWithArgsSpread(...args) {
  (() => {
    console.log(arguments);
  })();
}

function foo() {
  ((iifeArg) => {
    console.log(iifeArg, arguments);
  })('iifeArg1');
}

function foo() {
  ((...bar) => {
    console.log(bar, arguments);
  })('barValue');
}
