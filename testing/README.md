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

- For Non-Rails projects that require a full DOM, use [Karma](https://karma-runner.github.io/1.0/index.html). It integrates well with other tools you are likely using, such as bundlers and code coverage tools.

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
  // bring in Chai's assert, either per file or in a test helper
  import {assert} from 'chai';
  
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
  assert.strictEqual(foo, bar);
  ```

- Use sinon’s custom spy assertions, exposed to chai’s `assert` object.

  ```js
  // somewhere in the test setup...
  // (see http://sinonjs.org/docs/#assert-expose)
  sinon.assert.expose(assert);

  // bad
  assert.isTrue(spy.calledOnce);

  // good
  assert.calledOnce(spy);
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

- Test the interface, not the implementation. Ideally, you should not expose methods that you wouldn’t want users of your object to call directly, just so you can test them. Try to find the smallest unit of functionality that you would expect someone to use directly, and test that. Your implementation of that functionality should be able to change without affecting consumers or your tests.

- Try to limit the number of assertions made in a single test. For unit tests, you should only be testing one thing at a time (generally, an individual function, either standalone or as a method of an object), and more than one or two assertions is generally indicative that you should split your test into multiple tests.

- Use `suite`s to wrap tests related to a single subject under test (for example, a class or function). For simple subjects, simply list all `test`s within that one suite. For more complex subjects (for example, classes with many public methods, functions with many cases), first consider whether this complex subject can be broken up into simpler subjects. If you have broken it down as much as makes sense for your case, organize the different parts of your tests (methods, logical branches) into sub-`suite`s, and the `test`s for that part nested within.

  ```js
  suite('MyComponent', () => {
    suite('.staticMethod', () => {
      test('creates a new instance', () => {
        assert.instanceOf(MyComponent.staticMethod(), MyComponent);
      });
    });

    suite('#instanceMethod', () => {
      test('returns the expected value', () => {
        assert.equal(component.instanceMethod(), 'yes');
      });
    });
  });
  ```

- In general, each test has three steps: setup, perform the action under test, and assert based on the result.

- If your tests involve stubbing a lot of different objects, it can be a sign of a fragile technical design. Instead of having many external dependencies that are directly brought in by the module, it can be useful to rely on [dependency injection](https://en.wikipedia.org/wiki/Dependency_injection) instead. This design pattern can make code easier to understand and test.

- Avoid using mocks.

  > Why? They reverse the typical order of tests (setup, do something, assertion), which makes them harder to read in the context of other tests. Generally, you can achieve the same thing with stubs instead.

  ```js
  // bad
  const mock = sinon.mock(subject).expects('myMethod').once();
  subject.doSomething();
  mock.verify();

  // good
  const stub = sinon.spy(subject, 'myMethod');
  subject.doSoemthing();
  assert.calledOnce(stub);
  ```

[↑ scrollTo('#table-of-contents')](#table-of-contents)



## Types of testing

The guide above is mostly focused on unit tests, where a "unit" of code (ideally, the smallest version of an API) is tested in isolation from the rest of the system. However, there are a few other types of testing that are important to consider when writing JavaScript: integration testing, functional testing, and UI testing.

### Integration testing

Integration tests ensure that various parts of a system work properly together. It mostly focuses on the design of an overall architecture rather than individual pieces. In writing integration tests, make sure to keep the following in mind:

- Be careful not to do unit tests for the pieces of the system and integration tests for the system as a whole if the pieces are not part of the public interface. That is, if the pieces will only be used in combination as part of this system, the system is the actual unit of tests, and the pieces are an implementation detail that does not need direct tests (they are, of course, indirectly tested by the testing of the public interface to the system).

### Functional testing

In the context of developing web applications, functional testing is more accurately described as browser testing. The goal with these tests is to ensure that a part of the application works according to the specifications you have set. Keep the following in mind for these types of tests:

- Avoid relying on class names for finding components on the page. CSS selectors are meant as styling hooks, and the visual appearance of the page should be able to change without breaking your functional tests. If you absolutely must find a particular DOM node, prefer IDs or `data-` attributes.

- If your test is merely ensuring that a particular visual element is on the page, or that a particular class is on a component, it is more appropriate to use a visual regression test (detailed below), as you are effectively testing the visuals of the page indirectly through the classes you are querying.

### Visual regression testing

Visual regression testing allows you to be confident that changes made to the components that make up your interface did not affect the visual appearance. This kind of testing is particularly useful when refactoring a particular component, as it can ensure that layout and other visual properties did not change without cause.

[↑ scrollTo('#table-of-contents')](#table-of-contents)



## React

If your project is using React, you can find React-specific testing recommendations in the [React styleguide](https://github.com/Shopify/javascript/tree/master/react#testing).

[↑ scrollTo('#table-of-contents')](#table-of-contents)



## Resources

* [Wiki entry on shopify admin about testing.](https://github.com/Shopify/shopify/wiki/Admin-Testing)
* TODO any more helpful links?

[↑ scrollTo('#table-of-contents')](#table-of-contents)
