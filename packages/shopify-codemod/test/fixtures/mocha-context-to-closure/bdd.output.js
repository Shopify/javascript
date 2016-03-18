describe(function() {
  let foo;
  let baz;
  beforeEach(function() {
    foo = 'foo';
  });

  before(function() {
    baz = 'baz';
  });

  afterEach(function() {
    foo.toUpperCase();
  });

  after(function() {
    baz = 'baz2';
  });

  context('when something', function() {
    let bar;
    beforeEach(function() {
      bar = 'bar';
      foo = 'foo';
    });

    afterEach(function() {
      bar.toLowerCase();
    });

    it('does something', function() {
      foo += ' foo';
      expect(bar).to.equal('bar');
    });
  });

  describe(function() {
    let qux;
    before(function() {
      qux = 'qux';
    });
  });
});
