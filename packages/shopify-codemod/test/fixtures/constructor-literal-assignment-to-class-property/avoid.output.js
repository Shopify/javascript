class Foo {
  myMethod() {
    this.foo = 'foo';
  }
}

const Bar = {
  constructor() {
    this.bar = 'bar';
  }
}

class Baz {
  constructor() {
    this.baz += 'baz';
  }
}

class Qux {
  constructor() {
    const constructor = 'somethingWeird';
    this[constructor].qux = 'qux';
  }
}
