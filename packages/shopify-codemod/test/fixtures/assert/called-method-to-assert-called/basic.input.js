assert.ok(foo.bar.called);
assert.ok(foo.bar.calledOnce);
assert.ok(foo.bar.calledTwice);
assert.ok(foo.bar.calledThrice);

assert.isTrue(foo.bar.called);

assert.isTrue(foo.bar.notCalled);
assert.isFalse(foo.bar.called);
assert.isFalse(foo.bar.notCalled);
assert.notOk(foo.bar.called);
