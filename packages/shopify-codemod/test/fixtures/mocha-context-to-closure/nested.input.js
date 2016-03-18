suite('outer', function() {
  setup(function() {
    this.foo = 'foo';
  });

  suite('nested', function() {
    setup(function() {
      this.foo = 'foo';
      this.bar = 'bar';
    });

    test(function() {
      this.foo && this.bar;
    });
  });
});
