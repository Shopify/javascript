_.each(foo, () => {
  foo.bar();
  return;
});

_.each(() => {
  if (foo) {
    return;
  }

  foo.bar();
  return;
}, someObj);

_.each(() => {
  function baz() {
    return fuzz;
  }

  foo.bar();
  return;
});

_.each(() => {
  _.each(() => {
    foo;
    return;
  });

  return;
});

_._each(() => {
  return foo.bar();
});
