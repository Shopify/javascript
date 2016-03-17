# shopify-codemods

This repository contains a collection of Codemods written with [JSCodeshift](https://github.com/facebook/jscodeshift) that will help update our old, crusty JavaScript to nice, clean JavaScript.

## Usage

1. `npm install -g jscodeshift`
1. `git clone https://github.com/shopify/javascript` or [download the zip file](https://github.com/shopify/javascript/archive/master.zip)
1. `jscodeshift -t <codemod-script> <file>`
1. Use the `-d` option for a dry-run and use `-p` to print the output for comparison.

## Included Scripts

### `mocha-context-to-closure`

Transforms Mocha tests that use `this` to store context shared between tests to use closure variables instead.

```sh
jscodeshift -t javascript/packages/shopify-codemods/transforms/mocha-context-to-closure.js <file>
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

## Contributing

All code is written in ES2015+ in the `src/` directory. Make sure to add tests for all new transforms and features. A custom `transforms(fixtureName)` assertion is provided which checks that the passed transformer converts the fixture found at `test/fixtures/{{fixtureName}}.input.js` to the one found at `test/fixtures/{{fixtureName}}.output.js`. You can run `npm test` to run all tests, or `npm run test:watch` to have Mocha watch for changes and re-run the tests.
