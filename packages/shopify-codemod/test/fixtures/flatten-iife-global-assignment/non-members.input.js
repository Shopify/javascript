App.A = (function() {
  var Buzz = Fizz.Buzz;

  function A() {}

  A.prototype.foo = function() {
    return buzz('bar');
  };

  function buzz(str) {
    return new Buzz(`${str} buzzzzzzzzzzzz`);
  }

  return A;
})();
