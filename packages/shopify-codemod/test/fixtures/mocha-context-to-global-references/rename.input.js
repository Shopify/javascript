suite('test', function() {
  afterEach(function() {
    this.stub(foo, 'bar');
  });

  before(function() {
    this.testSpy = this.spy();
  });

  setup(function() {
    requests = this.server.requests;
  });

  it('works', function() {
    this.server.requests.forEach(() => assert.ok(request));
  });
});
