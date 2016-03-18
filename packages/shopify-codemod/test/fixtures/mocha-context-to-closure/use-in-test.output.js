suite('top-level', () => {
  let foo;
  let baz;
  setup(() => {
    foo = 'foo';
    baz = 'baz';
  });

  teardown(() => {
    foo.restore();
  });

  test('something', () => {
    foo.toLowerCase();
    baz = 'qux';
  });
});
