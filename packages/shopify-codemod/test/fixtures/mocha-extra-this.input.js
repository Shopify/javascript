suite('top-level', function() {
  setup('name', () => {
    this.foo = 'foo';
  });

  test('something', function() {
    callback(function() { this.foo; });
  });
});
