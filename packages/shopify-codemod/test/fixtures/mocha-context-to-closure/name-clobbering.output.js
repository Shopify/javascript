suite('top-level', function() {
  const foo = 'FOO';

  let foo_fromSetup;
  let bar;
  let baz;

  setup(function() {
    foo_fromSetup = 'foo';

    let bar_fromSetup = 'bar';
    bar_fromSetup = {};
    bar_fromSetup.name = 'bar';
    bar = bar_fromSetup;

    const notJustBaz = {};
    notJustBaz.name = 'baz';
    baz = notJustBaz;
  });

  test(function() {
    foo_fromSetup.toUpperCase();
  });
});
