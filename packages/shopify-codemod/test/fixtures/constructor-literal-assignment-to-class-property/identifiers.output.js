const baz = something;

class Foo {
  baz = baz;
  qux = baz.something.else();
  fuzz = 'already here';

  constructor(bar) {
    this.foo = bar.baz();
    this.bar = bar;
    this.buzz = this.foo.bar();
  }
}
