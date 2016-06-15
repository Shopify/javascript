const aThing = {
  foo: function() {},
  bar: () => {},
  baz() {},

  qux: function() { return 'qux'; },
  fuzz: () => 'fuzz',
  buzz: () => { return 'buzz'; },
  guzz() { return 'guzz'; },
}

class AnotherThing {
  foo() {}
  [bar]() {}
}
