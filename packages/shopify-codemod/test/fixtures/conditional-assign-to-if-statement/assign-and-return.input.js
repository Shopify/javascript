function assignAndReturnIdentifier() {
  return foo || (foo = 'bar');
}

function assignAndReturnProperty() {
  return foo.bar.foobar || (foo.bar.foobar = 'foo');
}

function assignAndReturnThisProperty() {
  return this.foo || (this.foo = 'bar');
}
