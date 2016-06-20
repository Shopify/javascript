function foo(...bar) {
  (() => {
    console.log(...arguments);
  })();

  function qux() {
    console.log(arguments);
  }
}
