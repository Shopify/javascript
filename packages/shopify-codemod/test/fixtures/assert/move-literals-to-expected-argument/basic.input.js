assert.equal(5, foo, 'error message');
assert.equal('foo', bar);
assert.equal('foo', this.foo.bar());
assert.equal('foo', !bar);
assert.equal(null, foo);
assert.equal((`foo`), bar);

assert.equal([], foo);
assert.deepEqual({}, foo, 'error message');
assert.notDeepEqual({}, foo);
assert.notEqual(1, foo);
assert.notStrictEqual(2, foo);
assert.strictEqual('foo', foo);
