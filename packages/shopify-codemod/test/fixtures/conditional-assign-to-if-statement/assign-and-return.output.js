function assignAndReturn() {
  if (!this.foo) {
    this.foo = 'bar';
  }

  return this.foo;
}
