assert.calledWith(foo, bar, 'qux');
assert.calledWithMatch(foo, {onlyKeys: ['foo', 'bar']});
assert.calledWithMatch(foo, sinon.match.string, sinon.match.object, sinon.match.object);
assert.calledWithExactly(foo, bar, qux);

assert.calledWith(foo, bar, qux);

assert.neverCalledWith(foo, bar, qux);
