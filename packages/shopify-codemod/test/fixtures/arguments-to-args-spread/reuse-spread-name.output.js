function foo(...bar) {
  (() => {
    console.log(...bar);
  })();

  function qux(...args) {
    console.log(args);
  }
}
