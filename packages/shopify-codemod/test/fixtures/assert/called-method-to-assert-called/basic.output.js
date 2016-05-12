assert.called(foo.bar);
assert.calledOnce(foo.bar);
assert.calledTwice(foo.bar);
assert.calledThrice(foo.bar);

assert.called(foo.bar);

assert.notCalled(foo.bar);
assert.notCalled(foo.bar);
assert.called(foo.bar);
assert.notCalled(foo.bar);
