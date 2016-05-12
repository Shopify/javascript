assert.strictEqual('foo', bar, 'error message');
assert.notStrictEqual(foo, bar);
assert.strictEqual(this.foo, 'bar');

assert.strictEqual(foo, bar);
assert.notStrictEqual(this.foo, bar);
