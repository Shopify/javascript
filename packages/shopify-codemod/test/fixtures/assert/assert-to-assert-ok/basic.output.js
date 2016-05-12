assert.ok(foo, 'error message');
assert.ok(foo.bar);
assert.ok(this.foo.bar);
assert.ok(this.foo.bar === that.bar.foo);

assert.ok(!foo);
assert.ok(!this.foo.bar);
assert.ok(!this.foo.bar());
