if (!foo) {
  foo = 'foobar';
}

if (!foo.bar) {
  foo.bar = 'foobar';
}

if (!foo.bar.baz) {
  foo.bar.baz = 'qux';
}

if (!this.bar) {
  this.bar = 'foobar';
}
