function foo() {
  (function() { // Function IIFE has its own scope.
    console.log(arguments, 'a' === arguments[0]);

    (() => {
      console.log(arguments, 'a' === arguments[0]);
      (() => {
        console.log(arguments, 'a' === arguments[0]);

        (function() {
          console.log(arguments, 'd' === arguments[0]);
        })('d');
      })('c');
    })('b');
  })('a');
}
