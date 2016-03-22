function assignAndReturn() {
  return this.foo || (this.foo = 'bar');
}
