_.each(foo, () => {
  foo.bar();
  return;
});

_.each(() => {
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

_._each(() => {
  return foo.bar();
});
