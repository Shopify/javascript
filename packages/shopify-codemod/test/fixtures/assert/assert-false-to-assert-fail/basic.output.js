assert.fail('error message 1');
assert.fail('error message 2');
assert.fail(`error message 3`);

assert.ok(false, foo);
assert.ok(false, 1); // Invalid, but assume it's not a failure message.
assert.ok(true, 'error message');
