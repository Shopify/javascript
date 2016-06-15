### `mocha-context-to-closure`

Transforms Mocha tests that use `this` to store context shared between tests to use closure variables instead.

```sh
jscodeshift -t shopify-codemod/transforms/mocha-context-to-closure <file>
```

#### Example

```js
describe(function() {
  beforeEach(function() {
    this.subject = {};
  });

  it('is an empty object', function() {
    expect(this.subject).to.deep.equal({});
  });
});

// BECOMES:

describe(() => {
  let subject;
  beforeEach(() => {
    subject = {};
  });

  it('is an empty object', () => {
    expect(subject).to.deep.equal({});
  });
});
```
