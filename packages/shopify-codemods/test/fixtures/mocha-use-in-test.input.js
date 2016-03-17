suite('top-level', function() {
  setup(function() {
    this.foo = 'foo';
    this.baz = 'baz';
  });

  teardown(function() {
    this.foo.restore();
  });

  test('something', function() {
    this.foo.toLowerCase();
    this.baz = 'qux';
  });
});
