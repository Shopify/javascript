suite('top-level', () => {
  const foo = 'FOO';

  let foo_fromSetup;
  let bar;
  let baz;

  setup(() => {
    foo_fromSetup = 'foo';

    let bar_fromSetup = 'bar';
    bar_fromSetup = {};
    bar_fromSetup.name = 'bar';
    bar = bar_fromSetup;

    const notJustBaz = {};
    notJustBaz.name = 'baz';
    baz = notJustBaz;
  });

  test(() => {
    foo_fromSetup.toUpperCase();
  });
});
