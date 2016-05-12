assert.equal(foo.callCount, 0, 'error message');
assert.equal(foo.callCount, 1);
assert.equal(foo.bar.callCount, 2);
assert.equal(this.foo.bar.callCount, 3);

assert.equal(foo.callCount, 4);
assert.equal(foo.callCount, 10);

assert.deepEqual(fn1.callCount, foo, 'callback count stayed the same');
assert.deepEqual(fn1.callCount, foo, 'callback count stayed the same');
