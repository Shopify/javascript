suite('a', () => {
  beforeEach(function() {
    return (function() {
      for (var i in [1, 2, 3]) {
        assert(typeof i === 'number');
      }
    })();
  });

  afterEach(() => {
    return (() => {
      for (var i in [1, 2, 3]) {
        assert(typeof i === 'number');
      }
    })();
  });

  it(() => {
    return ((i) => {
      for (var i in [1, 2, 3]) {
        assert(typeof i === 'number');
      }
    })(i);
  });
});
