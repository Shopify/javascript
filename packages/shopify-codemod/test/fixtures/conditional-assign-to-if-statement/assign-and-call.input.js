(foo || (foo = [])).push('foo');

(foo.bar || (foo.bar = [])).push('foo');

(this.foo.bar || (this.foo.bar = [])).push('foo');

function assignCallAndReturn() {
  return (this.foo.bar || (this.foo.bar = [])).push('foo');
}