suite('top-level', () => {
  let foo;
  setup('name', () => {
    foo = 'foo';
  });

  test('something', () => {
    callback(function() { this.foo; });
  });
});
