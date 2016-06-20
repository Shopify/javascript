function foo() {
  ((function(...args) { // Function IIFE has its own scope.
    console.log(args, 'a' === args[0]);

    (() => {
      console.log(args, 'a' === args[0]);
      (() => {
        console.log(args, 'a' === args[0]);

        ((function(...args) {
          console.log(args, 'd' === args[0]);
        }))('d');
      })('c');
    })('b');
  }))('a');
}
