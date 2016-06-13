### `mocha-context-to-global-reference`

Removes any specified properties that are injected into the mocha test context (that is, that are referenced using `this` in your tests) to appropriate globals instead. This is particularly useful for making any sinon-injected properties reference a global sinon sandbox. Note that you must provide a `testContextToGlobals` option for your transform, with keys that indicate the proper global to reference, referencing an object with a `properties` key that is an array of contextual properties to look for, and an optional `replace` key that indicates that the entire property should be renamed.

```sh
jscodeshift -t shopify-codemod/transforms/mocha-context-to-global-reference <file>
```

#### Example

```js

// WITH OPTIONS:
//
// {
//   testContextToGlobals: {
//     sinon: {
//       properties: ['spy', 'stub'],
//     },
//   },
// }

describe('foo', function() {
  setup(function() {
    this.mySpy = this.spy();
    this.myStub = this.stub(someObj, someProp);
  });
});

// BECOMES:

describe('foo', function() {
  setup(function() {
    this.mySpy = sinon.spy();
    this.myStub = sinon.stub(someObj, someProp);
  });
});

// AND WITH OPTIONS:
//
// {
//   testContextToGlobals: {
//     testClock: {
//       properties: ['clock'],
//       replace: true,
//     },
//   },
// }

describe('bar', function() {
  setup(function() {
    this.clock.setTime(Date.now());
  });
});

// BECOMES:

describe('bar', function() {
  setup(function() {
    testClock.setTime(Date.now());
  });
});
```
