assert(foo, 'error message');
assert(foo.bar);
assert(this.foo.bar);
assert(this.foo.bar === that.bar.foo);

assert(!foo);
assert(!this.foo.bar);
assert(!this.foo.bar());
