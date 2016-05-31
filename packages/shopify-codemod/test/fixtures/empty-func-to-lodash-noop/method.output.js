const aThing = {
  foo: _.noop,
  bar: _.noop,
  baz: _.noop,

  qux: function() { return 'qux'; },
  fuzz: () => 'fuzz',
  buzz: () => { return 'buzz'; },
  guzz() { return 'guzz'; },
}

class AnotherThing {
  foo = _.noop;
  [bar]() {}
}
