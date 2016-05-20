suite('a', () => {
  beforeEach(function() {
    for (var i in [1, 2, 3]) {
      assert(typeof i === 'number');
    }
  });

  afterEach(() => {
    for (var i in [1, 2, 3]) {
      assert(typeof i === 'number');
    }
  });

  it(() => {
    ((i) => {
      for (var i in [1, 2, 3]) {
        assert(typeof i === 'number');
      }
    })(i);
  });
});
