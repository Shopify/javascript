var Buzz = Fizz.Buzz;

App.A = function A() {};

App.A.prototype.foo = function() {
  return buzz('bar');
};

function buzz(str) {
  return new Buzz(`${str} buzzzzzzzzzzzz`);
}
