const baz = something;

class Foo {
  fuzz = 'already here';

  constructor(bar) {
    this.foo = bar.baz();
    this.bar = bar;
    this.baz = baz;
    this.qux = baz.something.else();
    this.buzz = this.foo.bar();
  }
}
