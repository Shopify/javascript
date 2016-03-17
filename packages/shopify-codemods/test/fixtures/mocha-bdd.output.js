describe(() => {
  let foo;
  let baz;
  beforeEach(() => {
    foo = 'foo';
  });

  before(() => {
    baz = 'baz';
  });

  afterEach(() => {
    foo.toUpperCase();
  });

  after(() => {
    baz = 'baz2';
  });

  context('when something', () => {
    let bar;
    beforeEach(() => {
      bar = 'bar';
      foo = 'foo';
    });

    afterEach(() => {
      bar.toLowerCase();
    });

    it('does something', () => {
      foo += ' foo';
      expect(bar).to.equal('bar');
    });
  });

  describe(() => {
    let qux;
    before(() => {
      qux = 'qux';
    });
  });
});
