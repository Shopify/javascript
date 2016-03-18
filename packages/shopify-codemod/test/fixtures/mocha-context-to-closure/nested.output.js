suite('outer', function() {
  let foo;
  setup(function() {
    foo = 'foo';
  });

  suite('nested', function() {
    let bar;
    setup(function() {
      foo = 'foo';
      bar = 'bar';
    });

    test(function() {
      foo && bar;
    });
  });
});
