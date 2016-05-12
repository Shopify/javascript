assert.equal(foo, 5, 'error message');
assert.equal(bar, 'foo');
assert.equal(this.foo.bar(), 'foo');
assert.equal(!bar, 'foo');
assert.equal(foo, null);
assert.equal(bar, `foo`);

assert.equal(foo, []);
assert.deepEqual(foo, {}, 'error message');
assert.notDeepEqual(foo, {});
assert.notEqual(foo, 1);
assert.notStrictEqual(foo, 2);
assert.strictEqual(foo, 'foo');
