suite('top-level', function() {
  let foo;
  let bar;
  setup('name', () => {
    foo = 'foo';
    bar = function() {
      return foo === 'foo';
    }

    unrelated.baz = function() {
      return this.foo === 'mystery';
    }
  });
});
