function foo() {
  return (pass ? bar : baz);
}

const foo = (pass ? bar : baz);

const boo = {
  foo: (pass ? bar : baz)
};
