function foo() {
  (function() { // Function IIFE has its own scope.
    console.log(arguments, 'a' === args[0]);

    (() => {
      console.log(arguments, 'a' === args[0]);
      (() => {
        console.log(arguments, 'a' === args[0]);

        (function() {
          console.log(arguments, 'd' === args[0]);
        })('d');
      })('c');
    })('b');
  })('a');
}
