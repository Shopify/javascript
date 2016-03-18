suite('outer', () => {
  let foo;
  setup(() => {
    foo = 'foo';
  });

  suite('nested', () => {
    let bar;
    setup(() => {
      foo = 'foo';
      bar = 'bar';
    });

    test(() => {
      foo && bar;
    });
  });
});
