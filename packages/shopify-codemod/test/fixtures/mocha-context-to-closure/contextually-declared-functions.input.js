suite('top-level', function() {
  setup('name', () => {
    this.foo = 'foo';
    this.bar = function() {
      return this.foo === 'foo';
    }

    unrelated.baz = function() {
      return this.foo === 'mystery';
    }
  });

  // Suites may call methods that generate tests.
  shouldNotBeTransformed();
});
