suite('a', () => {
  beforeEach(() => {
    a();
  });
  afterEach(() => {
    a();
  });
  before(() => {
    a();
  });
  after(() => {
    a();
  });
  setup(() => {
    a();
  });
  teardown(() => {
  });
  context('bla', function() {
    it('bla', () => {
      assert(true);
    });
  });

  test('a', () => {
    assert(false);
    assert(true);
  });
});
