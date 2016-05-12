assert(false, 'error message 1');
assert.ok(false, 'error message 2');
assert.ok(false, (`error message 3`));

assert.ok(false, foo);
assert.ok(false, 1); // Invalid, but assume it's not a failure message.
assert.ok(true, 'error message');
