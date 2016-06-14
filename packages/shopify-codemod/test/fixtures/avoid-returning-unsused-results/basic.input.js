_.each(foo, () => {
  return foo.bar();
});

_.each(() => {
  return foo.bar();
}, someObj);

_.each(() => {
  function baz() {
    return fuzz;
  }

  return foo.bar();
});

_._each(() => {
  return foo.bar();
});
