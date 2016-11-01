App.A = (function() {
  function Q() {}

  Q.prototype.foo = function() {
    return 'bar';
  };

  function buzz() {
    return new Q();
  }

  return Q;
})();
