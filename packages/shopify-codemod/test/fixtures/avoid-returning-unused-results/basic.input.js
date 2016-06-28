_.each(foo, () => {
  return foo.bar();
});

_.each(() => {
  if (foo) {
    return;
  }

  return foo.bar();
}, someObj);

_.each(() => {
  function baz() {
    return fuzz;
  }

  return foo.bar();
});

_.each(() => {
  return _.each(() => {
    return foo;
  });
});

_._each(() => {
  return foo.bar();
});
