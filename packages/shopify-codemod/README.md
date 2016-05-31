# shopify-codemod

This repository contains a collection of Codemods written with [JSCodeshift](https://github.com/facebook/jscodeshift) that will help update our old, crusty JavaScript to nice, clean JavaScript.

## Usage

1. `npm install -g jscodeshift`
2. `git clone https://github.com/shopify/javascript` or [download the zip file](https://github.com/shopify/javascript/archive/master.zip)
3. `npm run setup`
4. `jscodeshift -t <codemod-script> <file>`
5. Use the `-d` option for a dry-run and use `-p` to print the output for comparison.

## Included Transforms

### `add-missing-parseint-radix`

Transforms `parseInt` (including `Number.parseInt`) calls to have a radix parameter of `10` if none is provided. Note that, depending on the strings being passed to this call, this may change the result, so only use this when you are certain that any calls missing a radix should have a radix of `10`.

```sh
jscodeshift -t shopify-codemods/transforms/add-missing-parseint-radix <file>
```

### Example

```js
parseInt('42');
parseInt('1111', 2);
Number.parseInt('42');

// BECOMES:

parseInt('42', 10);
parseInt('1111', 2);
Number.parseInt('42', 10);
```

### `computed-literal-keys-to-dot-notation`

Transforms member expressions that have string literal keys to use dot notation whenever possible.

```sh
jscodeshift -t shopify-codemods/transforms/rename-identifier <file>
```

#### Example

```js
foo['bar']['baz'] = 'qux';
this['_foo'] = 'bar';
foo[0] = 42;
foo['bar-baz'] = 'qux';
foo[bar] = 'qux';

// BECOMES:

foo.bar.baz = 'qux';
this._foo = 'bar';
foo[0] = 42;
foo['bar-baz'] = 'qux';
foo[bar] = 'qux';
```

### `convert-default-export-objects-to-named-exports`

Transforms an exported object literal such that each property of the exported object becomes a named export.

```sh
jscodeshift -t shopify-codemods/transforms/convert-default-export-objects-to-named-exports <file>
```

#### Example

```js
export default {
  foo: 'bar',
  baz: qux,
}

// BECOMES:

export const foo = 'bar';
export const baz = qux;
```

### `rename-identifier`

Renames a user-defined list of identifiers. Use the `renameIdentifiers` option to specify the old name/ new name pairs.

```sh
jscodeshift -t shopify-codemods/transforms/rename-identifier <file>
```

#### Example

```js
// with {renameIdentifiers: {jQuery: '$'}}
jQuery('.foo').find('.bar');
jQuery.ajax();
foo.jQuery('.bar');

// BECOMES:

$('.foo').find('.bar');
$.ajax();
foo.jQuery('.bar');
```

### `rename-property`

Renames a user-defined list of object/ property pairs to use new property names. Use the `renameProperties` option to specify the old property name/ new property name pairs.

```sh
jscodeshift -t shopify-codemods/transforms/rename-property <file>
```

#### Example

```js
// with {renameProperties: {_: {first: 'head'}}}
_.first([]);
_.first.bind(_);
foo._.first([]);
_.each([]);

// BECOMES:

_.head([]);
_.head.bind(_);
foo._.first([]);
_.each([]);
```

### `global-identifer-to-import`

Creates import statements for global identifiers. Use the `globalIdentifiers` option to specify identifier/ import path pairs.

```sh
jscodeshift -t shopify-codemods/transforms/global-identifier-to-import <file>
```

#### Example

```js
// with {globalIdentifiers: {_: 'lodash', $: 'jquery'}}
_.map([], _.identity);
window.$('.foo').find('.bar');

// BECOMES:

import _ from 'lodash';
import $ from 'jquery';
_.map([], _.identity);
$('.foo').find('.bar');
```

### `coffeescript-soak-to-condition`

Changes the output of CoffeeScript’s soak operations (`foo?.bar.baz?()`) into a cleaner, more idiomatic JavaScript expression appropriate for its location in code.

```sh
jscodeshift -t shopify-codemod/transforms/coffeescript-soak-to-condition <file>
```

#### Example

```js
// foo = bar?.baz?()
var foo = typeof bar !== 'undefined' && bar !== null ? (typeof bar.baz === 'function' ? bar.baz() : void 0) : void 0;

// BECOMES

if (bar != null && typeof bar.baz === 'function') {
  var foo = bar.baz();
}

// if a?[bar]?()
if (typeof a !== "undefined" && a !== null ? (typeof a[bar] === "function" ? a[bar]() : void 0) : void 0) {

}

// BECOMES

// if a?[bar]?()
// else if a?[bar]?()
if (a != null && typeof a[bar] === 'function' && a[bar]()) {

}
```

### `coffeescript-range-output-to-helper`

Changes the output of CoffeeScript’s range operator (`[foo...bar]`) into a reference to Shopify’s global range helper. Because this creates a global, you should run the `global-reference-to-import` transform after this one.

```sh
jscodeshift -t shopify-codemod/transforms/coffeescript-range-output-to-helper <file>
```

#### Example

```js
// [this.qux..foo.bar.baz()] in CoffeeScript

(function() {
  var ref;
  var results = [];

  for (var i = ref = this.qux, ref1 = foo.bar.baz(); (ref <= ref1 ? i <= ref1 : i >= ref1); (ref <= ref1 ? i++ : i--)) {
      results.push(i);
  }

  return results;
}).apply(this);


// BECOMES:

Shopify.range({
  from: this.qux,
  to: foo.bar.baz(),
  inclusive: true
});

```

### `constructor-literal-assignment-to-class-property`

Moves context assignments in the constructor that are not dynamic (i.e., that don't depend on `this` and that don't depend on any bindings only available in the constructor) to class properties.

#### Example

```js
const baz = something;

class Foo {
  fuzz = 'already here';

  constructor(bar) {
    this.foo = bar.baz();
    this.bar = bar;
    this.baz = baz;
    this.qux = baz.something.else();
    this.buzz = this.foo.bar();
  }
}

// BECOMES:

const baz = something;

class Foo {
  baz = baz;
  qux = baz.something.else();
  fuzz = 'already here';

  constructor(bar) {
    this.foo = bar.baz();
    this.bar = bar;
    this.buzz = this.foo.bar();
  }
}
```

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

### `conditional-assign-to-if-statement`

Changes conditional assignment of default values to if statements (see [`no-unused-expressions`.](http://eslint.org/docs/rules/no-unused-expressions))

```sh
jscodeshift -t shopify-codemod/transforms/conditional-assign-to-if-statement <file>
```

#### Example

```js
foo || (foo = 'bar');

// BECOMES:

if (!foo) {
  foo = 'bar';
}
```

### `constant-function-expression-to-statement`

Changes constant function expression declarations to a statement.

```sh
jscodeshift -t shopify-codemod/transforms/constant-function-expression-to-statement <file>
```

#### Example

```js
const a = function() {
  return 1;
};

// BECOMES:

function a() {
  return 1;
}
```

### `function-to-arrow`

Changes function expressions to arrow functions, where possible.

```sh
jscodeshift -t shopify-codemod/transforms/function-to-arrow <file>
```

#### Example

```js
a(function() {
  b(function() { return 1; });
});

// BECOMES:

a(() => {
  b(() => 1);
});
```

### `global-assignment-to-default-export`

Use magic to automatically transform global variable references into import statements.

This transform is meant to be used in conjuction with [sprockets-commoner](https://github.com/Shopify/sprockets-commoner) (which is not open source at time of writing). It depends on `appGlobalIdentifiers` being set to an array of strings containing the global namespaces of your application (`App` in this example).

```sh
jscodeshift -t shopify-codemods/transforms/global-assignment-to-default-export <file>
```

#### Example

```js
App.whatever = 1;

// BECOMES:

'expose App.whatever';
export default 1;
```

### `global-reference-to-import`

Use magic to automatically transform global variable references into import statements.

This transform is meant to be used in conjuction with [sprockets-commoner](https://github.com/Shopify/sprockets-commoner) (which is not open source at time of writing). It depends on `appGlobalIdentifiers` being set to an array of strings containing the global namespaces of your application (`App` in this example). It also requires `javascriptSourceLocation` to be set to a folder containing all the source files.

```sh
jscodeshift -t shopify-codemods/transforms/global-reference-to-import <file>
```

#### Example

```js
console.log(App.Components.UIList);

// BECOMES:

import UIList from 'app/components/ui_list';
console.log(UIList);
```

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

### `strip-template-literal-parenthesis`

Removes superfluous parenthesis from `decaf`-generated template strings.

#### Example

```js
const foo = (`foo ${bar}`);

// BECOMES:

const foo = `foo ${bar}`;
```

### `ternary-statement-to-if-statement`

Changes ternary statement expressions to if statements.

```sh
jscodeshift -t shopify-codemod/transforms/ternary-statement-to-if-statement <file>
```

#### Example

```js
(1 > 2 ? a() : b());

// BECOMES:

if (1 > 2) {
  a();
} else {
  b();
}
```

```js
function c() {
  return (1 > 2 ? a() : b());
}

// BECOMES:

function c() {
  if (1 > 2) {
    return a();
  } else {
    return b();
  }
}
```

### `remove-trailing-else-undefined-return`

Removes useless returns in trailing else statements generated by Decaf.

```sh
jscodeshift -t shopify-codemod/transforms/remove-trailing-else-undefined-return <file>
```

#### Example

```js
foo = () => {
  if (bar != null) {
    return bar(true);
  } else {
    console.log('foo');
    return void 0;
  }
}

// BECOMES:

foo = () => {
  if (bar != null) {
    return bar(true);
  } else {
    console.log('foo');
  }
}
```

```js
foo = () => {
  if (bar != null) {
    return bar(true);
  } else {
    return void 0;
  }
}

// BECOMES:

foo = () => {
  if (bar != null) {
    return bar(true);
  }
}
```

## Contributing

All code is written in ES2015+ in the `transforms/` directory. Make sure to add tests for all new transforms and features. A custom `transforms(fixtureName)` assertion is provided which checks that the passed transformer converts the fixture found at `test/fixtures/{{fixtureName}}.input.js` to the one found at `test/fixtures/{{fixtureName}}.output.js`. You can run `npm test` to run all tests, or `npm run test:watch` to have Mocha watch for changes and re-run the tests.


### Development helpers
`bin/create-transform your-transform-name-here` creates a transform file, a test file, and some empty test fixtures.

`bin/rename-transform old-transform-name new-transform-name` renames the transforms file, test file, and fixture directory.
