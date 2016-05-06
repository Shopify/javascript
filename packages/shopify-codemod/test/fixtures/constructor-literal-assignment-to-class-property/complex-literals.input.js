class Foo {
  constructor(foo) {
    this.foo = {bar: 12, baz: true};
    this.bar = {[baz]: 'something'};
    this.baz = {[foo]: true};
    this.qux = {qux: foo};
    this.buzz = [{bar: 12}, {[bar]: 14}, [16], 18];
    this.fuzz = [foo, bar];
    this.something = {foo: true};
  }
}
