suite('test', function() {
  afterEach(function() {
    sinon.stub(foo, 'bar');
  });

  before(function() {
    this.testSpy = sinon.spy();
  });

  setup(function() {
    requests = sinon.server.requests;
  });

  it('works', function() {
    sinon.server.requests.forEach(() => assert.ok(request));
  });
});
