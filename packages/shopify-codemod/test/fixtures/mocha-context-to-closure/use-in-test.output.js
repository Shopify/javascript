suite('top-level', function() {
  let foo;
  let baz;
  setup(function() {
    foo = 'foo';
    baz = 'baz';
  });

  teardown(function() {
    foo.restore();
  });

  test('something', function() {
    foo.toLowerCase();
    baz = 'qux';
  });
});
