// Valid assertions that should *not* be altered by the transform.
assert.equal(foo, [], 'should not change');
assert.equal(foo, bar, 'should not change');
assert.equal(foo, 'bar', 'should not change');
assert.equal(foo, 'bar', (`should not change`));
