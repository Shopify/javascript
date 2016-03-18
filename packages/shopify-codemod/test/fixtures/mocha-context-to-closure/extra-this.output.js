suite('top-level', function() {
  let foo;
  setup('name', () => {
    foo = 'foo';
  });

  test('something', function() {
    callback(function() { this.foo; });
  });
});
