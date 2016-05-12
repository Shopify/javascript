assert.notCalled(foo);
assert.calledOnce(foo);
assert.calledTwice(foo.bar);
assert.calledThrice(this.foo.bar);

assert.callCount(foo, 4);
assert.callCount(foo, 10);

assert.callCount(fn1, foo);
assert.callCount(fn1, foo);
