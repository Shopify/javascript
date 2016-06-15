'expose Foo.Bar';

console.log('foo');

export default foo;
function foo() {}
delete foo.bar;
class Foo {}

const foo = () => {
  'expose Qux';
  delete foo.bar;
  return foo;
}
