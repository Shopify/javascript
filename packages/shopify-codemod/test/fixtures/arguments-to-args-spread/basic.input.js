function shouldGetArgsSpread() {
  foo(arguments);
}

function shouldGetArgsSpread() {
  foo(...arguments);
}

function shouldGetArgsSpread() {
  console.log(arguments);
  function arg1ShouldPreventRenamesInsideThisScope(arg1) {
    console.log(arguments);
  }
}

function foo() {
  (function() { // Function IIFE has its own scope.
    console.log(arguments);
  })();
}

function foo() {
  console.log(arguments);
  (() => { // Arrow IIFEs with no arguments inherit parent's arguments.
    console.log(arguments);
    (() => {
      console.log(arguments);
      (() => {
        console.log(arguments);
      })();
    })();
  })();
}

function arrowIIFEParentWithArgsSpread(...args) {
  (() => { // Arrow IIFE with no arguments inherits parent scope's arguments.
    console.log(arguments);
  })();
}

function foo() {
  (() => {
    (() => {
      console.log(arguments);
    })("arg1"); // Arrow IIFE with arguments does not inherit parent's arguments.
  })();
}

function foo() {
  console.log(arguments);
  (() => {
    console.log(arguments);
    ((arg1) => { // Arrow IIFE with arguments does not inherit parent's arguments.
      (() => {
        console.log(arguments);
      })();
    })();
  })();
}
