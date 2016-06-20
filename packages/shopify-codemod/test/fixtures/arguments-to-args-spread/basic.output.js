function shouldGetArgsSpread(...args) {
  foo(args);
}

function shouldGetArgsSpread(...args) {
  foo(...args);
}

function shouldGetArgsSpread(...args) {
  foo(() => {
    console.log(args);
  });
}

function noArgsSpread() {
  function shouldGetArgsSpread(...args) {
    console.log(args);
  }
}

function arrowIIFEParentWithArgsSpread(...args) {
  (() => {
    console.log(args);
  })();
}

function foo(...args) {
  ((iifeArg) => {
    console.log(iifeArg, args);
  })('iifeArg1');
}

function foo(...args) {
  ((...bar) => {
    console.log(bar, args);
  })('barValue');
}
