# Chai Assertion Codemods

A collection of codemods to improve your code's [Chai assertions](http://chaijs.com/api/assert/).  See the main README for [usage instructions](README.md#Usage).

## Included Transforms

Note: for best results, run all assertions in this order.

### `assert-false-to-assert-fail`

Changes `assert(false)`-like assertions to `assert.fail`.

```js
try {
  foo();
  assert(false, 'foo should throw an exception');
} catch (e) {

}

// BECOMES

try {
  foo();
  assert.fail('foo should throw an exception');
} catch (e) {

}
```

### `assert-to-assert-ok`

Changes implicitly truthy `assert` calls to more explicit `assert.ok` calls.

```js
assert(foo && foo.bar);

// BECOMES

assert.ok(foo && foo.bar);
```

### `negated-assert-ok-to-assert-not-ok`

Rewords positive assertions on negative expectations to negative assertions on positive expectations.

```js
assert.ok(!foo, 'error message');

// BECOMES

assert.notOk(foo, 'error message');
```

### `equality-comparisons-to-assertions`

Changes strict logical comparisons to assertions with clearer error messages.

```js
var foo = 'test';
assert.isTrue(foo === 'bar'); // Outputs `expected false to be true`.
assert.ok(foo !== 'qux');

// BECOMES
assert.strictEqual(foo, 'bar'); // Outputs `expected 'test' to equal 'bar'`.
assert.notStrictEqual(foo, 'qux');
```

### `move-literals-to-expected-argument`

Moves hard-coded values from the first (expected) argument of an assertion, to the second (actual) argument.

```js

assert.equal(5, foo);
assert.equal('bar', qux);
assert.notEqual('buzz', foobar);
assert.deepEqual([1, 2, 3], foo);

// BECOMES

assert.equal(foo, 5);
assert.equal(qux, 'bar');
assert.notEqual(foobar, 'buzz');
assert.deepEqual(foo, [1, 2, 3]);
```

### `called-equals-boolean-to-assert-called`

Changes truthy boolean `called`/`notCalled` equality assertions to `assert` methods with clearer error messages.

```js
assert.equal(foo.called, true); // Outputs `expected false to equal true`.
assert.strictEqual(foo.called, false);
assert.equal(foo.notCalled, true);

// BECOMES
assert.called(foo); // Outputs `expected spy to have been called once but was never called`.
assert.notCalled(foo.called);
assert.notCalled(foo);
```

### `call-count-equals-to-assert-called`

Changes truthy `callCount` equality assertions to `assert` methods with clearer error messages.

```js
assert.equal(foo.callCount, 0); // Outputs `expected 1 to equal 0`.
assert.equal(bar.callCount, 3);
assert.equal(foo.callCount, 4);

// BECOMES

assert.notCalled(foo); // Outputs `expected spy to be called 0 times, but was called once`.
assert.calledThrice(foo);
assert.callCount(foo, 4);
```

### `called-method-to-assert-called`

Changes truthy/falsy assertions about spy call counts to `assert` methods with clearer error messages.

```js
assert.ok(foo.called); // Outputs `expected false to be truthy`.
assert.ok(foo.calledOnce);
assert.isFalse(bar.called);

// BECOMES

assert.called(foo); // Outputs `expected spy to have been called at least once but was never called`.
assert.calledOnce(foo);
assert.notCalled(bar);
```

### `called-with-methods-to-assert-called-with`

Changes truthy assertions about spy `calledWith*` invocations to `assert` methods with clearer error messages.

```js
assert.isTrue(foo.calledWith('bar', 'qux')); // Outputs `expected false to be true`.
assert.isTrue(foo.calledWithMatch({onlyKeys: ['foo', 'bar']}), 'error message');
assert.ok(foo.calledWithExactly('bar', 'qux'));
assert.ok(foo.neverCalledWith('bar', 'qux'));

// BECOMES

assert.calledWith(foo, 'bar', 'qux'); // Outputs `expected spy to be called with arguments bar, qux`
assert.calledWithMatch(foo, {onlyKeys: ['foo', 'bar']});
assert.calledWithExactly(foo, 'bar', 'qux');
assert.neverCalledWith(foo, 'bar', 'qux');
```

### `falsy-called-method-to-assert-not-called`

Changes falsy assertions about spy `calledWith`/`calledWithMatch` invocations to `assert` methods with clearer error messages.

```js
assert.notOk(foo.calledWith(bar, qux)); // Outputs `expected true to be falsy`.
assert.isFalse(foo.calledWithMatch(bar));

// BECOMES
assert.neverCalledWith(foo, 'bar', 'qux'); // Outputs `expected spy to never be called with arguments bar, qux`.
assert.neverCalledWithMatch(foo, bar);
```
