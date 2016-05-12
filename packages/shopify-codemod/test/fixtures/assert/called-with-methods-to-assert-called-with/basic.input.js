assert.isTrue(foo.calledWith(bar, 'qux'), 'error message');
assert.isTrue(foo.calledWithMatch({onlyKeys: ['foo', 'bar']}), 'error message');
assert.isTrue(foo.calledWithMatch(sinon.match.string, sinon.match.object, sinon.match.object));
assert.isTrue(foo.calledWithExactly(bar, qux), 'error message');

assert.ok(foo.calledWith(bar, qux), 'error message');

assert.isTrue(foo.neverCalledWith(bar, qux));
