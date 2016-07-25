# `import {Testing} from 'Shopify'`

This guide looks at our recommended tools and conventions for testing JavaScript at Shopify. The primary focus of this guide is unit testing, but you can find some discussion of other types of testing in the [types of testing section](#types-of-testing).

## Table of contents

1. [Tools](#tools)
1. [Style](#style)
1. [Best practices](#best-practices)
1. [Types of testing](#types-of-testing)
1. [React](#react)
1. [Resources](#resources)



## Tools

We recommend using the following tools in your tests:

- [**mocha**](https://mochajs.org/) is our preferred test framework. It provides the basic scaffolding for tests including hooks, excellent support for asynchronous code, and more.

- [**chai**](http://chaijs.com/) is our preferred assertion library. It provides many expressive assertions that have descriptive error messages in the case of test failures.

- [**sinon**](http://sinonjs.org/) is our preferred library for handling spies and mocks in JavaScript.

These tools are commonly used together and have many excellent online resources, including solid documentation. In addition to the above, you can use [chai plugins](http://chaijs.com/plugins/) to provide more meaningful assertions. Use caution, however: only include a plugin where it materially helps improve the legibility of tests (otherwise, the burden of other developers tracking down a particular assertion outweighs the benefits you get from having it). [chai-as-promised](http://chaijs.com/plugins/chai-as-promised/) is an excellent example of a chai plugin that makes otherwise awkward tests much easier to read.

In addition to the testing framework, you generally need a test *runner*. Which runner to use will depend on the nature of your project:

- For pure-JavaScript projects that do not need access to the DOM, avoid using a test runner and simply run the `mocha` CLI instead (if you need a simple DOM without actual rendering, you can also use [cheerio](https://github.com/cheeriojs/cheerio) to construct a fake DOM).

- For Non-Rails projects that require a full DOM, use [Karma](https://karma-runner.github.io/1.0/index.html). It integrates well with other tools you are likely using, such as Webpack and code coverage tools.

- Rails projects should use [Teaspoon](https://github.com/modeset/teaspoon), which provides an excellent GUI for running tests in the browser. If you are also using [sprockets-commoner](https://github.com/Shopify/sprockets-commoner) to transpile your JavaScript, make sure to include [teaspoon-bundle](https://github.com/Shopify/teaspoon-bundle) to generate your test bundle.

There are a variety of other tools you might need depending on your project. Here are some additional recommendations we make:

- **Test coverage**: we recommend using [nyc](https://github.com/istanbuljs/nyc).

- **Rails fixtures**: if you are testing a component that has a non-trivial HTML component, using the actual partial improves the test’s resilience. We recommend using [Magic Lamp](https://github.com/crismali/magic_lamp) if you need access to real partials in a Rails application (if you are writing a JavaScript application, you should be able to import your partials using JavaScript imports).

[↑ scrollTo('#table-of-contents')](#table-of-contents)



## Style

- Our [shared linting configuration](../packages/eslint-plugin-shopify) provides a mocha-/ sinon-/ chai-focused linting configuration which you can use to prevent many common mistakes. To use it, simply extend `plugin:shopify/mocha` in your ESLint configuration (full details can be found on that package’s README).

- Use [TDD-style `assert` syntax](http://chaijs.com/api/assert/) over BDD-style `expect` or `should`.

  > Why? This keeps JavaScript tests more in line with our style for writing Ruby tests, which helps everyone contribute to the test codebase more easily.

  ```js
  // bad
  expect(2 === 1).to.be.false;
  (2 === 1).should.be.false;

  // good
  assert.isFalse(2 === 1);
  ```

- Use the Mocha-provided [TDD interface](https://mochajs.org/#tdd), which includes the `suite`, `test`, `setup`, and `teardown` functions.

  ```js
  // bad
  describe('myFunction', () => {
    beforeEach(() => {
      doSomeSetup();
    });

    it('is a function', () => {
      assert.isFunction(myFunction);
    });
  });

  // good
  suite('myFunction', () => {
    setup(() => {
      doSomeSetup();
    });

    test('it is a function', () => {
      assert.isFunction(myFunction);
    });
  });
  ```

- Do not attach variables under test to the Mocha test context (`this`). Instead, use variables scoped to the nearest `suite`. If using ESNext, always use arrow functions to ensure that you will not be able to rely on context.

  > Why? Using a shared context makes it too easy for tests to "leak" (have some impact on other tests), especially in other test files. It also makes it harder to track down what should be in scope at any given time.

  ```js
  // bad
  suite('MyComponent', function() {
    setup(function() {
      this.subject = new MyComponent();
      this.doSomethingWithComponent = function() {
        return this.subject.doSomething();
      }
    });

    test(function() {
      assert.isFalse(this.doSomethingWithComponent());
    });
  });

  // good
  suite('MyComponent', () => {
    let subject;
    function doSomethingWithComponent() {
      return subject.doSomething();
    }

    setup(() => {
      subject = new MyComponent();
    });

    test(() => {
      assert.isFalse(doSomethingWithComponent());
    });
  });
  ```

- Move any common setup to the `setup` hook of your suite.

  > Why? Setup in the test itself draws attention from whatever is being tested.

  ```js
  suite('MyComponent', () => {
    // bad
    suite('#myBadFunc', () => {
      test('it does something', () => {
        const subject = new MyComponent();
        sinon.stub(subject, 'myBadFunc').returns(true);
        assert.true(subject.doSomething())
      });

      test('it does something else', () => {
        const subject = new MyComponent();
        sinon.stub(subject, 'myBadFunc').returns(true);
        assert.false(subject.doSomethingElse())
      });
    });

    // good
    suite('#myBadFunc', () => {
      let subject;

      setup(() => {
        subject = new MyComponent();
        sinon.stub(subject, 'myBadFunc').returns(true);
      });

      test('it does something', () => {
        assert.true(subject.doSomething())
      });

      test('it does something else', () => {
        assert.false(subject.doSomethingElse())
      });
    });
  });
  ```

- Something something about how to name your tests

- Do not rely on test ordering for your tests to run correctly. Imagine each test was going to be run in a separate process, and must therefore entirely setup any preconditions before running.

  > Why? Tests that depend on anything outside of them will inevitably break as more tests are added. Other developers will assume there is no shared context between tests; don’t violate that assumption!

- Use sinon’s spies/ stubs instead of rolling your own version.

  > Why? Spies and stubs provide a consistent interface in case the tests need to be changed, reduce boilerplate so you can focus on the subject under test, can easily be restored to their original versions, and can be tested with more meaningful assertions.

  ```js
  suite('MyComponent', () => {
    // bad
    suite('#myBadFunc', () => {
      let original;
      let calledWith;

      setup(() => {
        spy = function(firstArg) { calledWith = firtArg; }
        let original = subject.myBadFunc;
        subject.myBadFunc = spy;
      });

      teardown(() => {
        subject.myBadFunc = original;
      });

      test('it works', () => {
        subject.doSomething();
        assert.equal(calledWith, 'some arg');
      });
    });

    // good
    suite('#myGoodFunc', () => {
      let spy;

      setup(() => {
        spy = sinon.spy(subject, 'myGoodFunc');
      });

      teardown(() => {
        spy.restore();
      });

      test('it works', () => {
        subject.doSomething();
        assert.calledWith(spy, 'some arg');
      });
    });
  });
  ```

- Use the most meaningful assertion for what you are trying to test. For a list of available assertions, make sure to check out [chai’s `assert` docs](http://chaijs.com/api/assert/).

  > Why? More specific assertions have more specific error messages, making it easier for you (and any developer that deals with this code in the future) to track down and fix test failures.

  ```js
  // bad
  assert.isTrue(foo === bar);

  // good
  assert.equal(foo, bar);
  ```

- Use sinon’s custom spy assertions, exposed to chai’s `assert` object.

  ```js
  // somewhere in the test setup...
  // (see http://sinonjs.org/docs/#assert-expose)
  sinon.assert.expose(assert);

  // bad
  assert.isTrue(spy.called);

  // good
  assert.called(spy);
  ```

- Always use a test helper that sets up your global test state. This generally includes adding any chai plugins you need, setting up a global sinon sandbox, and any other global hooks you require. It is often useful to expose `sinon`/ `sandbox` and `assert` to the global object in this helper to avoid needing to import them in every test file.

  ```js
  // Here's an example test-helper file

  import chai, {assert} from 'chai';
  import sinon from 'sinon';
  import chaiAsPromised from 'chai-as-promised';

  chai.use(chaiAsPromised);
  sinon.assert.expose(assert);

  // This creats a sandbox that will automatically restore any
  // stubbed properties performed during tests.
  const sandbox = sinon.sandbox.create();

  global.assert = assert;
  global.sinon = sandbox;

  afterEach(() => {
    sandbox.restore();
  });
  ```

- Use mocha’s ability to automatically finish tests when a returned promise is resolved for tests that are asynchronous and depend on promises.

  ```js
  // bad
  test('it resolves with a value', (done) => {
    doSomethingAsync()
      .then((result) => {
        assert.equal(result, 'something');
        done();
      })
      .catch(() => {
        assert(false, 'The promise was rejected :(');
      });
  });

  // good
  test('it resolves with a value', () => {
    return doSomethingAsync()
      .then((result) => {
        assert.equal(result, 'something');
      });
  });

  // also good, if using async/ await
  test('it resolves with a value', async () => {
    const result = await doSomethingAsync();
    assert.equal(result, 'something');
  });
  ```

[↑ scrollTo('#table-of-contents')](#table-of-contents)



## Best practices

- Try to limit the number of assertions made in a single test. For unit tests, you should only be testing one thing at a time (generally, an individual function, either standalone or as a method of an object), and more than one or two assertions is generally indicative that you should split your test into multiple tests.

- Something something about how to organize suites (by method? by context?)

- In general, each test has three steps: setup, perform the action under test, and assert based on the result.

- Don't rely too heavily on mocking — maybe dependency injection instead?

- Avoid using mocks.

  > Why? They reverse the typical order of tests (setup, do something, assertion), which makes them harder to read in the context of other tests. Generally, you can achieve the same thing with stubs instead.

[↑ scrollTo('#table-of-contents')](#table-of-contents)



## Approach and types of testing

Like all software testing approaches, JavaScript testing can be divided into three types: unit testing, integration testing, and functional testing.

**Unit Testing** Unit testing checks whether a particular piece (unit/module) of code is working fine. The ‘unit’ is often a function (either as a method or a standalone function).

**Integration Testing** Integration testing is performed when various units are integrated with each other to form a sub-system or a system. This mostly focuses in the design and construction of the software architecture.

**Functional Testing** The software is tested for the functional requirements. This checks whether the application is behaving according to the specification.

We currently have no recommended approach to integration or functional testing. But here are some tips to keep in mind:

* Avoid assertions on CSS selectors as much as possible. These types of tests are often too brittle.
* Keep interaction elements like "click button" as open to change as possible.
* Test more complex flows, for example:
  * "Add a product" as opposed to the specifics of automatic variant generation or publish visibility toggling.

[↑ scrollTo('#table-of-contents')](#table-of-contents)



## React

If your project is using React, you can find React-specific testing recommendations in the [React styleguide](https://github.com/Shopify/javascript/tree/master/react#testing).

[↑ scrollTo('#table-of-contents')](#table-of-contents)



## Resources

* [Wiki entry on shopify admin about testing.](https://github.com/Shopify/shopify/wiki/Admin-Testing)
* TODO any more helpful links?

[↑ scrollTo('#table-of-contents')](#table-of-contents)
