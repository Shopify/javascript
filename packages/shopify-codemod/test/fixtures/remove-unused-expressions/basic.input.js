'expose Foo.Bar';

console.log('foo');
foo.bar;
'a string';
123;
foo;
foo ? bar : baz;
!foo.bar;

export default foo;
function foo() {}
delete foo.bar;
class Foo {}

() => {
  'expose Qux';
  delete foo.bar;
}

const foo = () => {
  'expose Qux';
  foo.bar;
  delete foo.bar;
  return foo;
}
