### `remove-useless-return-from-test`

Changes CoffeeScript-translated test files to remove useless return statements.

```sh
jscodeshift -t shopify-codemod/transforms/remove-useless-return-from-test <file>
```

#### Example

```js
suite('a', () => {
  beforeEach(() => {
    return a();
  });
  afterEach(() => {
    return a();
  });
  before(() => {
    return a();
  });
  after(() => {
    return a();
  });
  setup(() => {
    return a();
  });
  teardown(() => {
  });
  context('bla', function() {
    return it('bla', () => {
      return assert(true);
    });
  });
  return test('a', () => {
    assert(false);
    return assert(true);
  });
});


// BECOMES:

suite('a', () => {
  beforeEach(() => {
    a();
  });
  afterEach(() => {
    a();
  });
  before(() => {
    a();
  });
  after(() => {
    a();
  });
  setup(() => {
    a();
  });
  teardown(() => {
  });
  context('bla', function() {
    it('bla', () => {
      assert(true);
    });
  });

  test('a', () => {
    assert(false);
    assert(true);
  });
});

```
