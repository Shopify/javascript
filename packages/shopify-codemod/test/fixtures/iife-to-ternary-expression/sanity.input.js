function foo() {
  return (() => {
    if (pass) {
      return bar;
    } else {
      return baz;
    }
  })();
}

const foo = (() => {
  if (pass) {
    return bar;
  } else {
    return baz;
  }
})();

const boo = {
  foo: (() => {
    if (pass) {
      return bar;
    } else {
      return baz;
    }
  })()
};
