class Foo {
  foo = {bar: 12, baz: true};
  bar = {[baz]: 'something'};
  buzz = [{bar: 12}, {[bar]: 14}, [16], 18];
  something = {foo: true};
  constructor(foo) {
    this.baz = {[foo]: true};
    this.qux = {qux: foo};
    this.fuzz = [foo, bar];
  }
}
