describe(function() {
  beforeEach(function() {
    this.foo = 'foo';
  });

  before(function() {
    this.baz = 'baz';
  });

  afterEach(function() {
    this.foo.toUpperCase();
  });

  after(function() {
    this.baz = 'baz2';
  });

  context('when something', function() {
    beforeEach(function() {
      this.bar = 'bar';
      this.foo = 'foo';
    });

    afterEach(function() {
      this.bar.toLowerCase();
    });

    it('does something', function() {
      this.foo += ' foo';
      expect(this.bar).to.equal('bar');
    });
  });

  describe(function() {
    before(function() {
      this.qux = 'qux';
    });
  });
});
