# JavaScript testing styleguide

This guide provides guidelines for testing JavaScript code.
Included are recommended tools, approaches to testing, and a living styleguide.

## Table of contents

1. [Approach and types of testing](#approach-and-types-of-testing)
1. [Tooling](#tooling)
  1. [Tools for a rails stack](#tools-for-a-rails-stack)
  1. [Tools for a non-rails stack](#tools-for-a-non-rails-stack)
1. [Assert-style syntax rules](#assert-style-syntax-rules)
1. [Using fixtures to represent HTML](#using-fixtures-to-represent-html)
1. [Spying, stubbing, and mocking](#spying-stubbing-and-mocking)
1. [Testing React](#testing-react)
1. [Resources](#resources)

## Approach and types of testing

Like all software testing approaches, JavaScript testing can be divided into three types: unit testing, integration testing, and functional testing.

**Unit Testing** Unit testing checks whether a particular piece (unit/module) of code is working fine. The ‘unit’ is often delimited by a JavaScript class.

**Integration Testing** Integration testing is performed when various units are integrated with each other to form a sub-system or a system. This mostly focuses in the design and construction of the software architecture.

**Functional Testing** The software is tested for the functional requirements. This checks whether the application is behaving according to the specification.

We currently have no recommended approach to integration or functional testing. But here are some tips to keep in mind:

* Avoid assertions on CSS selectors as much as possible. These types of tests are often too brittle.
* Keep interaction elements like "click button" as open to change as possible.
* Test more complex flows, for example:
  * "Add a product" as opposed to the specifics of automatic variant generation or publish visibility toggling.

TODO: Section on TDD style testing and why we chose that approach

## Tooling

TODO: write about what role each thing plays in this crazy play. Pick one true test runner. Separate to rails/non-rails.

* Test runner:
  * [teaspoon](https://github.com/modeset/teaspoon)
  * [testem](https://github.com/testem/testem)
  * [karma](https://karma-runner.github.io/1.0/index.html)
* Assertion library: [mocha](https://mochajs.org/) + [chai](http://chaijs.com/guide/styles/#assert) with assert style syntax
* Spy/stubs/mocks: [Sinon](http://sinonjs.org/)
* Helper libraries:
  * [sinon-chai](https://github.com/domenic/sinon-chai)

### Tools for a rails stack

TODO

### Tools for a non-rails stack

TODO

## Assert-style syntax rules

TODO: flesh this out

* assert/TDD style with chai
* whitespace
* test suites
* examples of DRYer testing (before/after blocks)
* DO clean up after tests
* DO declare function scoped variables - DO NOT attach to the test runner's `this`

## Using fixtures to represent HTML

TODO: how do we use fixtures?
TODO: how do we use fixtures with Rails partials?
TODO: Is this how we do it? https://github.com/Shopify/shopify/wiki/Admin-Testing

## Spying, stubbing, and mocking

TODO: steal liberally from https://github.com/Shopify/shopify/wiki/Admin-Testing spy section

## Testing React

If your project is using React, we have a [recommended approach for testing React components in our React styleguide.](https://github.com/Shopify/javascript/tree/master/react#testing)

## Resources

* [Wiki entry on shopify admin about testing.](https://github.com/Shopify/shopify/wiki/Admin-Testing)
* TODO any more helpful links?

[↑ scrollTo('#table-of-contents')](#table-of-contents)
