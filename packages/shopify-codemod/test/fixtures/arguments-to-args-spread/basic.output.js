function shouldGetArgsSpread(...args) {
  foo(args);
}

function shouldGetArgsSpread(...args) {
  foo(...args);
}

function shouldGetArgsSpread(...args) {
  console.log(args);
  function arg1ShouldPreventRenamesInsideThisScope(arg1) {
    console.log(arguments);
  }
}

function foo() {
  ((function(...args) { // Function IIFE has its own scope.
    console.log(args);
  }))();
}

function foo(...args) {
  console.log(args);
  (() => { // Arrow IIFEs with no arguments inherit parent's arguments.
    console.log(args);
    (() => {
      console.log(args);
      (() => {
        console.log(args);
      })();
    })();
  })();
}

function arrowIIFEParentWithArgsSpread(...args) {
  (() => { // Arrow IIFE with no arguments inherits parent scope's arguments.
    console.log(args);
  })();
}

function foo() {
  (() => {
    (((...args) => {
      console.log(args);
    }))("arg1"); // Arrow IIFE with arguments does not inherit parent's arguments.
  })();
}

function foo(...args) {
  console.log(args);
  (() => {
    console.log(args);
    ((arg1) => { // Arrow IIFE with arguments does not inherit parent's arguments.
      (() => {
        console.log(arguments);
      })();
    })();
  })();
}
