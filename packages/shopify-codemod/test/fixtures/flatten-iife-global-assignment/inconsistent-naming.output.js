App.A = function A() {};

App.A.prototype.foo = function() {
  return 'bar';
};

function buzz() {
  return new App.A();
}
