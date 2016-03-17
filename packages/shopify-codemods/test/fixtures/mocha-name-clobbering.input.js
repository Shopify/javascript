suite('top-level', function() {
  const foo = 'FOO';

  setup(function() {
    this.foo = 'foo';

    let bar = 'bar';
    bar = {};
    bar.name = 'bar';
    this.bar = bar;

    const notJustBaz = {};
    notJustBaz.name = 'baz';
    this.baz = notJustBaz;
  });

  test(function() {
    this.foo.toUpperCase();
  });
});
