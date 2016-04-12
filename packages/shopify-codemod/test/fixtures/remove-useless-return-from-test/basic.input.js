suite('a', () => {
  beforeEach(function() {
    return;
  });
  beforeEach(() => {
    return a();
  });
  afterEach(() => {
    return a();
  });
  before(() => {
    return a();
  });
  after(() => {
    return a();
  });
  setup(() => {
    return a();
  });
  teardown(() => {
  });
  context('bla', function() {
    return it('bla', () => {
      return assert(true);
    });
  });
  return test('a', () => {
    assert(false);
    return assert(true);
  });
});
