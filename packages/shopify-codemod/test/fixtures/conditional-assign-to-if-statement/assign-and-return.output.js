function assignAndReturnIdentifier() {
  if (!foo) {
    foo = 'bar';
  }

  return foo;
}

function assignAndReturnProperty() {
  if (!foo.bar.foobar) {
    foo.bar.foobar = 'foo';
  }

  return foo.bar.foobar;
}

function assignAndReturnThisProperty() {
  if (!this.foo) {
    this.foo = 'bar';
  }

  return this.foo;
}
