if (!foo) {
  foo = [];
}

foo.push('foo');

if (!foo.bar) {
  foo.bar = [];
}

foo.bar.push('foo');

if (!this.foo.bar) {
  this.foo.bar = [];
}

this.foo.bar.push('foo');

function assignCallAndReturn() {
  if (!this.foo.bar) {
    this.foo.bar = [];
  }

  return this.foo.bar.push('foo');
}