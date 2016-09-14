# `import JavaScript from 'Shopify'`

[![Circle CI](https://circleci.com/gh/Shopify/javascript.svg?style=svg)](https://circleci.com/gh/Shopify/javascript)

This repository contains everything you should need for writing JavaScript at Shopify. In it you’ll find such things as our linting configs, custom linting rules, and project generators. Below, you’ll find the most important thing: a living styleguide documenting how and why we write JavaScript the way we do.

> Why? All code in any code-base should look like a single person typed it, no matter how many people contributed. If we all follow along with the rules detailed below, we can focus our efforts on more meaningful problems.



## Table of contents

1. [Using this guide](#using-this-guide)
1. [Naming](#naming)
1. [Punctuation](#punctuation)
1. [Whitespace](#whitespace)
1. [References](#references)
1. [Control flow](#control-flow)
1. [Objects](#objects)
1. [Arrays](#arrays)
1. [Strings](#strings)
1. [Functions](#functions)
1. [Types and casting](#types-and-casting)
1. [ESNext features](#esnext-features)
1. [Project structure](#project-structure)
1. [Resources](#resources)

In addition to the above, we have created a specific guide for the tools and conventions surrounding JavaScript testing: our [Testing styleguide](testing/). There are also a few additional guides for libraries commonly used at Shopify:

- [jQuery styleguide](jquery/)
- [React styleguide](react/)

Have a legacy codebase? Can’t use ESNext? Our [legacy styleguide](legacy/) is available in this repo just for you. We also have a dedicated [CoffeeScript styleguide](https://github.com/Shopify/CoffeeScript-Style-Guide) for projects that are still using CoffeeScript (new projects should use ESNext, though!).



## Using this guide

Many of the following rules are enforced by our [shared ESLint config/ plugin](packages/eslint-plugin-shopify), which you can use in most editors and CI environments. To use it, you will need to have [Node.js >=5.7.0 and npm installed](https://docs.npmjs.com/getting-started/installing-node). Once these are installed, you must then install ESLint and the Shopify plugin:

```bash
npm install eslint eslint-plugin-shopify --save-dev
```

Once these are installed, you will need to add an ESLint configuration in your project’s `package.json`.

```js
{
  "eslintConfig": {
    // or "plugin:shopify/es5" for the ES5 config, "plugin:shopify/react" for the React config.
    "extends": "plugin:shopify/esnext",
    // choose your environments: http://eslint.org/docs/user-guide/configuring.html#specifying-environments
    "env": {}
  }
}
```

> Note: you can also provide an array of configurations, if you want to have linting rules for tools like lodash. See the [eslint-plugin-shopify](packages/eslint-plugin-shopify) repo for details.

You can now use ESLint. The easiest way to do this is by adding a linting script to your `package.json`:

```js
{
  "scripts": {
    "lint": "eslint . --max-warnings 0"
  }
}
```

And, finally, run your new script:

```bash
npm run lint
```



## Naming

- [2.1](#2.1) <a name="2.1"></a> Use camelCase when naming functions, objects, and instances. Snake case is acceptable when interacting with an external API that provides objects with snake-cased keys, like Rails.

  ESLint rule: [`camelcase`](http://eslint.org/docs/rules/camelcase.html)

  ```js
  // bad
  const bad_snake_name = 'Larry';
  const UGLYname = 'this';
  const badObject = {some_prop: 'some-value'};

  // good
  const goodSnakeName = 'Basilisk';
  const prettyName = 'this';
  const goodObject = {someProp: 'some-value'};

  // not ideal, but sometimes necessary and acceptable
  const objectProvidedByRails = {some_rails_provided_prop: 'some-value'};
  ```

- [2.2](#2.2) <a name="2.2"></a> Use PascalCase when naming classes, factories, enumerations, or singletons (cases of enums are written in screaming snake case).

  ESLint rule: [`new-cap`](http://eslint.org/docs/rules/new-cap.html)

  ```js
  // bad
  class badClass {}
  const bad = new badClass();

  const badType = {
    Water: 0,
    Fire: 1,
    Ghost: 2,
  };

  // good
  class GoodClass {}
  const good = new GoodClass();

  const Type = {
    WATER: 0,
    FIRE: 1,
    GHOST: 2,
  };
  ```

- [2.3](#2.3) <a name="2.3"></a> Use a leading underscore when naming "private" properties. Functions and variables in scope should be named normally.

  > Why? The leading underscore sends a signal to other developers that these methods should not be called or relied upon. Some tools can also obfuscate methods with leading underscores to ensure that they are not called by outside objects. Items in scope but not exported are completely private, so no signaling is required for these.

  > **Note:** Use these underscore-prefixed members as a last resort. Prefer moving them to be functions/ variables in scope or making them part of the public API over using this naming convention.

  ESLint rule: [`no-underscore-dangle`](http://eslint.org/docs/rules/no-underscore-dangle.html)

  ```js
  // bad
  export const bad = {
    __privateOne__: 0,
    privateTwo_: 1,
  };

  function _badPrivateFunctionInScope() {}

  // good
  export const good = {
    _private: 0,
  };

  function goodPrivateFunctionInScope() {}
  ```

- [2.4](#2.4) <a name="2.4"></a> Avoid single letter names; be descriptive with the names you choose. Note that exceptions can be made for common one-letter identifiers, particularly for use as properties (`x`, `y`, `i`, `j`, `_`).

  ESLint rule: [`id-length`](http://eslint.org/docs/rules/id-length.html)

  ```js
  // bad
  const b = 'BAD';

  // good
  const good = 'GOOD';
  const point = {
    x: 10,
    y: 20,
  };
  ```

- [2.5](#2.5) <a name="2.5"></a> Don’t save references to `this`. Use an arrow function (preferred) or `function#bind` instead.

  ```js
  // bad
  const badObject = {
    logSelfAfterTimeout() {
      const that = this;
      setTimeout(function() {
        console.log(that);
      }, 500);
    }
  }

  // better
  const betterObject = {
    logSelfAfterTimeout() {
      setTimeout(function() {
        console.log(this);
      }.bind(this), 500);
    }
  }

  // best
  const bestObject = {
    logSelfAfterTimeout() {
      setTimeout(() => console.log(this), 500);
    }
  }
  ```

- [2.6](#2.6) <a name="2.6"></a> When naming an event object, use `evt` (as opposed to `e` or `event`).

  ```js
  // bad
  function badHandleClickOne(e) {}
  function badHandleClickTwo(event) {}

  // good
  function goodHandleClick(evt) {}
  ```

[↑ scrollTo('#table-of-contents')](#table-of-contents)



## Punctuation

- [3.1](#3.1) <a name="3.1"></a> Always use semicolons.

  ESLint rules: [`semi`](http://eslint.org/docs/rules/semi.html) and [`class-property-semi`](packages/eslint-plugin-shopify/docs/rules/class-property-semi.md)

  ```js
  // bad
  function bad() {
    const badChoice = 'No semicolons'
    return badChoice
  }

  // good
  function good() {
    const goodChoice = 'Semicolons';
    return goodChoice;
  }
  ```

- [3.2](#3.2) <a name="3.2"></a> Do not use leading commas.

  > Why? It’s ugly to look at and trailing commas are a better solution to the same problems.

  ESLint rule: [`comma-style`](http://eslint.org/docs/rules/comma-style.html)

  ```js
  // bad
  const badOne = {
      one: 1
    , two: 2
    , three: 3
  };

  const badTwo = [
      1
    , 2
    , 3
  ];

  // good
  const goodOne = {
    one: 1,
    two: 2,
    three: 3,
  };

  const goodTwo = [
    1,
    2,
    3,
  ];
  ```

- [3.3](#3.3) <a name="3.3"></a> Objects and arrays should use trailing commas, unless they are on a single line. Commas should always be followed by a space, but never preceded by one.

  > Why? Trailing commas allow you to add and remove a given property of an object without also editing the surrounding lines, which keeps the change isolated to the property in question.

  > **Note:** trailing commas are not permitted in JSON, so be sure to omit them.

  ESLint rules: [`comma-dangle`](http://eslint.org/docs/rules/comma-dangle.html), [`comma-spacing`](http://eslint.org/docs/rules/comma-spacing.html)

  ```javascript
  // bad
  const badOne = {
    foo: 1,
    bar: 2
  };

  const badTwo = {foo: 1, bar: 2,};

  const badThree = [
    1,
    2
  ];

  const badFour = [1,2];

  // good
  const good = {
    foo: 1,
    bar: 2,
  };

  const goodTwo = {foo: 1, bar: 2};

  const goodThree = [
    1,
    2,
  ];

  const goodFour = [1, 2];
  ```

- [3.4](#3.4) <a name="3.4"></a> Never use commas to separate multiple statements.

  ESLint rule: [`no-sequences`](http://eslint.org/docs/rules/no-sequences.html)

  ```js
  let a;

  // bad
  while (a = something(), a != null && a.length !== 0) {
    // do something
  }

  // good
  while (a = something()) {
    if (a.length === 0) { break; }
  }
  ```

[↑ scrollTo('#table-of-contents')](#table-of-contents)



## Whitespace

- [4.1](#4.1) <a name="4.1"></a> In general, add whitespace to improve legibility of code and to group statements together in a way that will produce a more coherent “story” for the next developer to look at code. **Never** optimize for code size: minifiers will do a much better job than you ever could.

- [4.2](#4.2) <a name="4.2"></a> Use two spaces for indentation.

  ESLint rule: [`indent`](http://eslint.org/docs/rules/indent.html)

  ```js
  // bad
  function badOne() {
  ∙∙∙∙return true;
  }

  function badTwo() {
  ∙return true;
  }

  // good
  function good() {
  ∙∙return true;
  }
  ```

- [4.3](#4.3) <a name="4.3"></a> Use braces for all blocks, including those that are on a single line.

  > Why? Requiring braces prevents issues when a second statement is added to a single-line block.

  ESLint rule: [`curly`](http://eslint.org/docs/rules/curly.html)

  ```js
  const condition = true;

  // bad
  if (condition) doSomething();
  if (condition)
    doSomething();
    doSomethingElse(); // will run even if condition is false!

  // good
  if (condition) { doSomething(); }
  if (condition) {
    doSomething();
    doSomethingElse();
  }
  ```

- [4.4](#4.4) <a name="4.4"></a> Place one space before a leading brace. When using `if-else` and `try-catch` constructs, the second part starts on the same line as the closing brace of the first, with a single space between them.

  ESLint rules: [`brace-style`](http://eslint.org/docs/rules/brace-style.html), [`space-before-blocks`](http://eslint.org/docs/rules/space-before-blocks.html)

  ```js
  // bad
  function bad()
  {
    doSomething();
  }

  if (condition){ doSomething(); }

  if (otherCondition) {
    doSomething();
  }
  else {
    doSomethingElse();
  }

  // good
  function good() {
    doSomething();
  }

  if (condition) { doSomething(); }

  if (otherCondition) {
    doSomething();
  } else {
    doSomethingElse();
  }
  ```

- [4.5](#4.5) <a name="4.5"></a> Place one space before the opening parenthesis in control statements (`if`, `while`, etc). Place no space between the function name and argument list in function calls and declarations.

  ESLint rule: [`keyword-spacing`](http://eslint.org/docs/rules/keyword-spacing.html)

  ```js
  // bad
  if(condition) {
    doSomething ();
  }

  function doSomething () {}

  // good
  if (condition) {
    doSomething();
  }

  function doSomething() {}
  ```

- [4.6](#4.6) <a name="4.6"></a> All operators should be surrounded by spaces.

  ESLint rule: [`space-infix-ops`](http://eslint.org/docs/rules/space-infix-ops.html)

  ```js
  // bad
  const bad=34+32;

  // good
  const good = 1 + 2;
  ```

- [4.7](#4.7) <a name="4.7"></a> End files with a single newline character. Avoid any end-of-line whitespace.

  ESLint rules: [`eol-last`](http://eslint.org/docs/rules/eol-last.html), [`no-trailing-spaces`](http://eslint.org/docs/rules/no-trailing-spaces.html)

  ```js
  // bad-one.js
  const bad = true;
  ```

  ```js
  // bad-two.js
  const bad = true;↵
  ↵
  ```

  ```js
  // bad-three.js
  const bad = true;∙∙↵
  ```

  ```js
  // good.js
  const good = true;↵
  ```

- [4.8](#4.8) <a name="4.8"></a> Use indentation when dealing with long method chains. Use a leading dot on each new line.

  > Why? Breaking a method chain across lines improves readability. The leading dot clearly emphasizes that this is a method call, not a new statement.

  ESLint rules: [`dot-location`](http://eslint.org/docs/rules/dot-location.html), [`newline-per-chained-call`](http://eslint.org/docs/rules/newline-per-chained-call.html)

  ```js
  const result = [1, 2, 3, 4, 5].filter((x) => x > 2).map((x) => x * x * x).reduce((total, x) => total + x, 0);

  // good
  const result = [1, 2, 3, 4, 5]
    .filter((x) => x > 2)
    .map((x) => x * x * x)
    .reduce((total, x) => total + x, 0);
  ```

- [4.9](#4.9) <a name="4.9"></a> Do not include extra space inside parentheses, brackets, or curly braces that define an object literal. Include spaces for curly braces that define a single-line function.

  ESLint rules: [`space-in-parens`](http://eslint.org/docs/rules/space-in-parens.html), [`array-bracket-spacing`](http://eslint.org/docs/rules/array-bracket-spacing.html), [`object-curly-spacing`](http://eslint.org/docs/rules/object-curly-spacing.html)

  ```js
  // bad
  function badFunction( arg ) {return true;}

  const badObject = { isBad: true };
  badObject[ 'isBad' ];

  const badArray = [ 1, 2, 3 ];

  // good
  function goodFunction(arg) { return true; }

  const goodObject = {isGood: true};
  goodObject['isGood'];

  const goodArray = [1, 2, 3];
  ```

- [4.10](#4.10) <a name="4.10"></a> Limit the number of statements on a single line to improve readability.

  ESLint rule: [`max-statements-per-line`](http://eslint.org/docs/rules/max-statements-per-line.html)

  ```js
  // bad
  function bad() { dont = 'do this'; return please; }

  // good
  function good() {
    doThis = true;
    return thanks;
  }

  // fine as well, as long as there is only one, short statement.
  function fine() { return 'but don’t push it!'; }
  ```

- [4.11](#4.11) <a name="4.11"></a> Line comments should appear above the line they are commenting, rather than at the end of the line or below it.

  > Why? End-of-line comments can be harder to read since they lead to longer lines. Comments above the line you are documenting provides a more natural experience when reading the code, as it follows how we typically read other forms of text.

  ESLint rule: [`line-comment-position`](http://eslint.org/docs/rules/line-comment-position.html)

[↑ scrollTo('#table-of-contents')](#table-of-contents)



## References

- [5.1](#5.1) <a name="5.1"></a> Always use `let` or `const` (as described in the following rule) to declare variables. Forgetting to do so will result in global variables, which is bad news.

  ESLint rule: [`no-undef`](http://eslint.org/docs/rules/no-undef.html)

  ```js
  // bad
  bad = BadChoice();

  // good
  const good = GoodChoice()
  ```

- [5.2](#5.2) <a name="5.2"></a> Use [`const`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const) for all references that do not need to be re-assigned. Use [`let`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let) only for references that will be re-assigned. Never use `var`.

  > Why? `const` and `let` are block scoped, rather than being function-scoped like `var`. `const` indicates that a given reference will always refer to the same object or primitive throughout the current scope, which makes code easier to reason about.

  ESLint rules: [`prefer-const`](http://eslint.org/docs/rules/prefer-const.html), [`no-const-assign`](http://eslint.org/docs/rules/no-const-assign.html), [`no-var`](http://eslint.org/docs/rules/no-var.html)

  ```javascript
  // bad
  var CONSTANT_VALUE = 1;
  var count = 0;
  if (true) {
    count += 1;
  }

  // good
  const someUnchangingReference = 1;
  let count = 0;
  if (true) {
    count += 1;
  }
  ```

- [5.3](#5.3) <a name="5.3"></a> Initialize variables on declaration as often as possible. If a variable has no value until a later point (for example, it is calculated inside a complex conditional expression, or it is a variable in scope that is redeclared for each unit test), you can declare a variable without initialization.

  ESLint rule: [`init-declarations`](http://eslint.org/docs/rules/init-declarations.html)

  ```js
  // bad
  let bad = null;
  // ...
  bad = 'bad';

  // good
  const goodOne = 'good';

  // or, if you can't provide a value immediately:
  let goodTwo;
  // ...
  goodTwo = 'good';
  ```

- [5.4](#5.4) <a name="5.4"></a> don’t refer a reference before it is defined. The only exception to this rule is for functions; use the hoisting feature of functions liberally to allow the primary export of a file to appear first (and any helper or utility functions it uses to appear afterwards).

  ESLint rule: [`no-use-before-define`](http://eslint.org/docs/rules/no-use-before-define.html)

  ```js
  // bad
  function bad() {
    return badVar;
  }

  const badVar = true;

  // good
  const goodVar = true;

  function good() {
    return goodVar;
  }
  ```

- [5.5](#5.5) <a name="5.5"></a> Use screaming snake case for file-level constants to make it clear to users that they can’t be modified.

  ```javascript
  // bad
  const constantValue = 1;

  // good
  const CONSTANT_VALUE = 1;
  ```

- [5.6](#5.6) <a name="5.6"></a> Declare each variable on its own line; never comma-separate your variables on a single line.

  > Why? Listing all variables on a single line makes it harder to scan, and encourages creating too many local variables.

  ESLint rule: [`one-var`](http://eslint.org/docs/rules/one-var.html).

  ```javascript
  // bad
  const badFooOne = 'bar', badBazOne = 'qux';
  const badFooTwo = 'bar',
      badBazTwo = 'qux';

  // good
  const goodFoo = 'bar';
  const goodBaz = 'qux';
  ```

- [5.7](#5.7) <a name="5.7"></a> Never shadow variable names from outer scopes. Avoid shadowing of names with special meaning, like `arguments`.

  > Why? It makes the code harder to reason about because the purpose of a given variable changes with the scope, and introduces the opportunity for subtle bugs by assigning to the variable when you meant to redeclare it.

  ESLint rules: [`no-shadow`](http://eslint.org/docs/rules/no-shadow.html), [`no-shadow-restricted-names`](http://eslint.org/docs/rules/no-shadow-restricted-names.html)

  ```js
  // bad
  function bad() {
    const arguments = [];
    const foo = true;

    runCallback(() => {
      const foo = false;
      return true;
    });

    // what is `foo`?
  }

  // good
  function good() {
    const args = [];
    const foo = true;

    runCallback(() => {
      const callbackFoo = false;
      return false;
    });
  }
  ```

- [5.8](#5.8) <a name="5.8"></a> For a given section of code for which you are defining variables (typically, at the top of a block), group all `const` declarations that apply to that entire scope, then group all `let` declarations that apply to the entire scope.

  > Why? It is easier to see all variables that are used, and whether they are able to be re-assigned or not.

  ```js
  // bad
  let i = 0;
  const FOO = true;
  const bar = 'bar';
  someUnrelatedCall();
  const BAZ = false;

  // good
  const FOO = true;
  const BAZ = false;
  const bar = 'bar';
  let i = 0;

  someUnrelatedCall();
  ```

- [5.9](#5.9) <a name="5.9"></a> Assign variables at the point that you actually need them; that is, variables need not all be declared at the top of a given scope.

  ```js
  // bad
  function checkName(hasName) {
    const name = getName(); // unnecessary function call if `hasName` is `false`
    if (!hasName) { return false; }
    return name.length > 0;
  }

  // good
  function checkName(hasName) {
    if (!hasName) { return false; }
    const name = getName();
    return name.length > 0;
  }
  ```

[↑ scrollTo('#table-of-contents')](#table-of-contents)



## Control flow

- [6.1](#6.1) <a name="6.1"></a> Never allow fallthrough in `switch` statements.

  ESLint rule: [`no-fallthrough`](http://eslint.org/docs/rules/no-fallthrough.html)

  ```js
  // bad
  switch (badVar) {
  case 1:
    doSomething();
  case 2:
    doSomethingElse();
  }

  // good
  switch (goodVar) {
  case 1:
    doSomething();
    break;
  case 2:
    doSomethingElse();
    break;
  }
  ```

- [6.2](#6.2) <a name="6.2"></a> Never use labels or the `with` statement.

  ESLint rules: [`no-labels`](http://eslint.org/docs/rules/no-labels.html), [`no-with`](http://eslint.org/docs/rules/no-with.html)

  > Why? Using labels is generally indicative of code that is overly complex. The `with` statement makes it [difficult for the reader](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Statements/with) to determine whether a given binding exists and, if it exists, in which scope or object it will be found. It is also not allowed in strict mode.

- [6.3](#6.3) <a name="6.3"></a> Never perform assignment in a condition.

  > Why? It can easily create confusion as to whether this was intended or was meant to be a comparison operation.

  ESLint rule: [`no-cond-assign`](http://eslint.org/docs/rules/no-cond-assign.html)

  ```js

  // bad (did you mean `==`/ `===`?)
  let myVar;
  if (myVar = doSomething()) {}

  // good
  const myVar = doSomething();
  if (myVar) {}
  ```

- [6.4](#6.4) <a name="6.4"></a> Never have only a single `if` block within an `else` block; combine these into an `else if` block (or, if returning in the `if` block, as another `if` block).

  ESLint rule: [`no-lonely-if`](http://eslint.org/docs/rules/no-lonely-if.html)

  ```js
  // bad
  if (conditionOne) {
    return 'Matched One!';
  } else {
    if (conditionTwo) {
      return 'Matched Two!';
    }
  }

  // better
  if (conditionOne) {
    return 'Matched One!';
  } else if (conditionTwo) {
    return 'Matched Two!';
  }

  // best
  if (conditionOne) {
    return 'Matched One!';
  }

  if (conditionTwo) {
    return 'Matched Two!';
  }
  ```

- [6.5](#6.5) <a name="6.5"></a> Never nest ternary expressions. When such a complex calculation exists, it is usually best to break it into steps or to use a helper function to calculate the value.

  > Why? They produce incredibly hard to read code.

  ESLint rule: [`no-nested-ternary`](http://eslint.org/docs/rules/no-nested-ternary.html)

  ```js
  // bad
  const bad = someCondition ? (someOtherCondition ? 'foo' : 'bar') : (someFinalCondition ? 'baz' : 'qux');

  // good
  function calculateGood(someCondition, someOtherCondition, someFinalCondition) {
    if (someCondition) {
      return someOtherCondition ? 'foo' : 'bar';
    } else {
      return someFinalCondition ? 'baz' : 'qux';
    }
  }

  const good = calculateGood(someCondition, someOtherCondition, someFinalCondition);
  ```

- [6.5](#6.5) <a name="6.5"></a> Don’t nest an entire function body inside a conditional. Instead, return early using the opposite of the conditional.

  > Why? This reduces indentation and makes the code easier to read.

  ESLint rule: [`prefer-early-return`](packages/eslint-plugin-shopify/docs/rules/prefer-early-return.md)

  ```js
  // bad
  function badFunc() {
    if (something) {
      doThis();
      andThat();
    }
  }

  // good
  function goodFunc() {
    if (!something) { return; }
    doThis();
    doThat();
  }
  ```

[↑ scrollTo('#table-of-contents')](#table-of-contents)



## Objects

- [7.1](#7.1) <a name="7.1"></a> Use object literal syntax for object creation. Use `Object.create` in order to define objects with more complex property descriptors, or to set the object’s prototype.

  ESLint rule: [`no-new-object`](http://eslint.org/docs/rules/no-new-object.html).

  ```javascript
  // bad
  const badOne = new Object();

  const badTwo = {};
  Object.setPrototypeOf(badTwo, badOne);

  const badThree = {};
  Object.defineProperty(badThree, 'prop', {value: 10, enumerable: false});

  // good
  const goodOne = {};
  const goodTwo = Object.create(goodOne);
  const goodThree = Object.create({}, {
    value: 10,
    enumerable: false,
  });
  ```

- [7.2](#7.2) <a name="7.2"></a> Never include spaces before the colon in an object literal property declaration. Use one space after the colon or, if it improves readability to align values, indent the fewest number of spaces *after* the colon to align the values.

  ```javascript
  // bad
  const badOne = {
    foo : 1,
    bar:   2,
  };

  const badTwo = {
    short        : 3,
    longProperty : 4,
  };

  // good
  const goodOne = {
    foo: 1,
    bar: 2,
  };

  const goodTwo = {
    short:        3,
    longProperty: 4,
  };
  ```

- [7.3](#7.3) <a name="7.3"></a> Objects that span multiple lines should have one property per line with each property indented by one level. The closing brace should be on its own line, aligned with the column of the line on which the opening brace appeared.

  ESLint rules: [`indent`](http://eslint.org/docs/rules/indent.html) and [`object-curly-newline`](http://eslint.org/docs/rules/object-curly-newline.html)

  ```javascript
  // bad
  const badOne = {
    foo: 1, bar: 2,
  };

  const badTwo = {
      baz: 3, }

  // good

  const goodOne = {
    foo: 1,
    bar: 2,
  };

  const goodTwo = {
    baz: 3,
  };
  ```

- [7.4](#7.4) <a name="7.4"></a> Single-line object literals are permissible, but beware objects with more than a few, short keys: they can quickly become unreadable. Object literals on a single line should not have any spaces after the opening brace or before the closing brace.

  > Why? Objects on a single line use no interior spaces to differentiate them from functions (particular arrow functions) on a single line (which *should* have interior spaces between braces, if present).

  ESLint rules: [`object-curly-spacing`](http://eslint.org/docs/rules/object-curly-spacing.html), [`brace-style`](http://eslint.org/docs/rules/brace-style.html)

  ```javascript
  // bad
  const badOne = { foo: 1 };
  const badTwo = {bar: 2, baz: 3, qux: 4, manyMoreKeys: 5, evenMoreNowItGetsHardToRead: 6};

  // good
  const goodOne = {foo: 1};
  const goodTwo = {
    bar: 2,
    baz: 3,
    qux: 4,
    manyMoreKeys: 5,
    evenMoreNowItGetsHardToRead: 6,
  };
  ```

- [7.5](#7.5) <a name="7.5"></a> Use object method and property shorthands.

  > Why? It is shorter and removes visual noise for objects with many properties and methods.

  ESLint rule: [`object-shorthand`](http://eslint.org/docs/rules/object-shorthand.html)

  ```javascript
  const name = 'Fido';

  // bad
  const bad = {
    name: name,
    action: function() {
      return 'bite';
    },
  }

  // good
  const good = {
    name,
    action() {
      return "bark";
    },
  };
  ```

- [7.6](#7.6) <a name="7.6"></a> Use computed property names (unless using Flow, which does not support these yet).

  > Why? It allows you to define all properties in one place, and mirrors the way you would access those properties.

  ```javascript
  const propertyName = 'foo';

  // bad
  const bad = {};
  bad[propertyName] = true;

  // good
  const good = {
    [propertyName]: true,
  };
  ```

- [7.7](#7.7) <a name="7.7"></a> Use dot notation when possible. Use subscript notations (`[]`) only when your key is not a valid identifier or the key is stored in a variable.

  ```js
  const obj = {fooBar: 1, 'baz-qux': 2};

  // bad
  const fooBar = obj['fooBar'];

  // good
  const fooBar = obj.fooBar;
  const bazQux = obj['baz-qux'];

  const bazKey = 'baz-qux'
  const altBazQux = obj[bazKey];
  ```

- [7.8](#7.8) <a name="7.8"></a> When using object literals, place computed properties first, non-function properties second, and function properties third.

  > Why? It’s easier to see which properties are using shorthand, and will generally result in increasing line length of property declarations (which is easier to scan than random line lengths).

  ```javascript
  const propertyOne = 1;
  function propertyTwo() {};

  // bad
  const bad = {
    doSomethingWithProperties() {},
    propertyOne,
    propertyThree: 3,
    propertyTwo,
  };

  // good
  const good = {
    propertyOne,
    propertyTwo,
    propertyThree: 3,
    doSomethingWithProperties() {},
  }
  ```

- [7.9](#7.9) <a name="7.9"></a> Only quote properties that are invalid identifiers.

  > Why? It’s easier to read properties, matches well to how we encourage Ruby hashes with symbols to be written, and encourages you use camelCased, valid identifiers.

  ESLint rule: [`quote-props`](http://eslint.org/docs/rules/quote-props.html)

  ```javascript
  // bad
  const bad = {
    'foo': 1,
    'bar': 2,
    'some-invalid-identifier': 3,
  };

  // good
  const good = {
    foo: 1,
    bar: 2,
    'some-invalid-identifier': 3,
  };
  ```

[↑ scrollTo('#table-of-contents')](#table-of-contents)



## Arrays

- [8.1](#8.1) <a name="8.1"></a> Always use literal syntax for array creation.

  ESLint rule: [`no-array-constructor`](http://eslint.org/docs/rules/no-array-constructor.html)

  ```javascript
  // bad
  const bad = new Array();

  // good
  const good = [];
  ```

- [8.2](#8.2) <a name="8.2"></a> Do not insert spaces on the inside of array literals on a single line. Indent every item of an array literal that spans multiple lines by two spaces, and align the closing bracket to the column of the line that contains the opening bracket. If your array spans multiple lines, place only one item per line.

  > Why? These stylistic choices make array and object literal declarations visually consistent with one another.

  ESLint rule: [`array-bracket-spacing`](http://eslint.org/docs/rules/array-bracket-spacing.html)

  ```javascript
  // bad
  const badOne = [ 1, 2 ];
  const badTwo = [
    3,
    4, 5,
    ]

  // good
  const goodOne = [1, 2];
  const goodTwo = [
    3,
    4,
    5,
  ];
  ```

- [8.3](#8.3) <a name="8.3"></a> Use `Array#push` instead of direct assignment to add items to an array.

  ```javascript
  const myArray = [];

  // bad
  myArray[myArray.length] = 'bad';

  // good
  myArray.push('good');
  ```

- [8.4](#8.4) <a name="8.4"></a> Use the spread operator (`...`) to copy arrays, rather than iterating over the array or using `Array#slice`. If you need subsections of the array, continue to use `Array#slice`.

  ```javascript
  const originalArray = [1, 2, 3];

  // bad
  const badNewArray = [];
  originalArray.forEach((item) => badNewArray.push(item));
  const otherBadNewArray = originalArray.slice();

  // good
  const goodNewArray = [...originalArray];
  ```

- [8.5](#8.5) <a name="8.5"></a> To convert from an array-like object to an array (for example, a `NodeList` returned by `document.querySelectorAll`, or a jQuery object), use `Array.from`.

  ```javascript
  const nodes = document.querySelectorAll('.my-nodes');

  // bad
  const badNodesArray = [].slice.apply(nodes);

  // good
  const goodNodesArray = Array.from(nodes);
  ```

[↑ scrollTo('#table-of-contents')](#table-of-contents)



## Strings

- [9.1](#9.1) <a name="9.1"></a> Use single quotes for strings. Using double quotes is acceptable only to avoid escaping contained single quotes.

  > Why? We don’t want to argue about this. Like, ever. Please use single quotes!

  ESLint rule: [`quotes`](http://eslint.org/docs/rules/quotes.html)

  ```javascript
  // bad
  const badOne = "Sorry not sorry";
  const badTwo = `No interpolation, no need`;
  const badThree = 'Escaping is \'no good\'';

  // good
  const goodOne = 'Nice and clean';
  const goodTwo = 'No interpolation, no backticks';
  const goodThree = "Double quotes are 'fine' in this case.";
  ```

- [9.2](#9.2) <a name="9.2"></a> Avoid long strings if possible. If you must include a long string, you can include multiline strings in code using backticks (`` ` ``). If the whitespace of multiline strings is unacceptable, you can use multiline string concatenation or an array of reasonable-length strings joined together.

  ```javascript
  // bad
  const badString = 'The path of the righteous man is beset on all sides by the iniquities of the selfish and the tyranny of evil men. Blessed is he who, in the name of charity and good will, shepherds the weak through the valley of darkness'

  // fine, if newlines are acceptable
  const fineString = `
    The path of the righteous man is beset on all sides by the iniquities of the selfish and the tyranny of evil men.
    Blessed is he who, in the name of charity and good will, shepherds the weak through the valley of darkness
  `;

  // good
  const goodString = 'The path of the righteous man is beset on all sides ' +
    'by the iniquities of the selfish and the tyranny of evil men. ' +
    'Blessed is he who, in the name of charity and good will, ' +
    'shepherds the weak through the valley of darkness';
  ```

- [9.3](#9.3) <a name="9.3"></a> Use template strings instead of concatenation. When ambedding expressions in the template strings, never include spaces within the curly braces.

  > Why? The template string syntax is easier to read and consistent with how we build strings programatically in other languages.

  ESLint rules: [`prefer-template`](http://eslint.org/docs/rules/prefer-template.html), [`template-curly-spacing`](http://eslint.org/docs/rules/template-curly-spacing.html)

  ```javascript
  const name = 'Chris';

  // bad
  const badOne = 'DO NOT do it this way, ' + name + '!';
  const badTwo = ['And definitely not this way, either, ', name, '!'].join('');
  const badThree = `So close, ${ name }, but so far!`;

  // good
  const goodOne = `Much better, ${name}!`;
  ```

[↑ scrollTo('#table-of-contents')](#table-of-contents)



## Functions

- [10.1](#10.1) <a name="10.1"></a> Never use the Function constructor to create a new function. Similarly, never use `eval`.

  > Why? Creating a function in this way evaluates the string as-is, allowing for vulnerabilities and making code harder to test.

  ESLint rules: [`no-new-func`](http://eslint.org/docs/rules/no-new-func.html), [`no-eval`](http://eslint.org/docs/rules/no-eval.html), [`no-implied-eval`](http://eslint.org/docs/rules/no-implied-eval.html)

  ```js
  // bad
  const add = new Function('a', 'b', 'return a + b');
  ```

- [10.2](#10.2) <a name="10.2"></a> Use function declarations instead of function expressions.

  > Why? Function declarations are named, so they’re easier to identify in call stacks. Also, the whole body of a function declaration is hoisted, whereas only the reference of a function expression is hoisted. This rule makes it possible to always use Arrow Functions in place of function expressions.

  ESLint rule: [`func-style`](http://eslint.org/docs/rules/func-style.html)

  ```js
  // bad
  const bad = function() {}

  // good
  function good() {}
  ```

- [10.3](#10.3) <a name="10.3"></a> When using IIFEs, always wrap the function parentheses, with dangling parentheses for the function call.

  > **Note**: If using modules, the module (file) itself serves as a private scope for variables. As such, IIFEs are rarely needed in this case. Additionally, when using `const`/ `let`, you can create a private scope simply by using an unnamed block.

  ESLint rule: [`wrap-iife`](http://eslint.org/docs/rules/wrap-iife.html)

  ```js
  // bad
  ;function() {
    const privateMember = 'foo';
  }()

  (function() {
    const privateMember = 'foo';
  }())

  // good
  (function() {
    const privateMember = 'foo';
  })()
  ```

- [10.4](#10.4) <a name="10.4"></a> Anonymous functions leave no space between the `function` keyword and the parentheses. All functions have no spaces around their list of parameters, and a single space between the closing paren of the parameter list and the opening curly brace.

  > Why? Because consistency is good!

  ESLint rules: [`space-before-blocks`](http://eslint.org/docs/rules/space-before-blocks.html), [`space-before-function-paren`](http://eslint.org/docs/rules/space-before-function-paren.html), [`space-in-parens`](http://eslint.org/docs/rules/space-in-parens.html)

  ```js
  // bad
  function badOne(){}
  function badTwo () {}
  function badThree( arg1, arg2 ) {}

  // good
  function goodOne() {}
  function goodTwo() {}
  function goodThree(arg1, arg2) {}
  ```

- [10.5](#10.5) <a name="10.5"></a> Never declare a function in a non-function block (`if`, `while`, etc). Assign the function to a variable instead.

  > Why? ECMA-262 defines a `block` as a list of statements. A function declaration is not a statement. As such, declaring a function in a block is not spec-compliant, and can be interpreted differently depending on the environment.

  ESLint rule: [`no-loop-func`](http://eslint.org/docs/rules/no-loop-func.html)

  ```js
  // bad
  if (true) {
    function bad() {
      console.log('Please avoid this!');
    }
  }

  // good
  let test;
  if (true) {
    test = () => console.log('This is better!');
  }
  ```

- [10.6](#10.6) <a name="10.6"></a> Functions should either always return a value, or never return a value. If a function optionally returns something, return `null` in the case where the relevant conditions were not met.

  ESLint rule: [`consistent-return`](http://eslint.org/docs/rules/consistent-return.html)

  ```js
  // bad
  function badFunction(condition) {
    if (!condition) { return; }
    return 'Condition met!';
  }

  // good
  function goodFunction(condition) {
    if (!condition) { return null; }
    return 'Condition met!';
  }
  ```

- [10.7](#10.7) <a name="10.7"></a> Instead of using `function#apply()` to call a function with an array of arguments, use the spread operator.

  > Why? It reduces redundancy since you don’t have to specify the object to apply against, and it mirrors the rest syntax when declaring variadic functions.

  ESLint rule: [`prefer-spread`](http://eslint.org/docs/rules/prefer-spread.html)

  ```js
  const numbers = [1, 2, 3, 4, 5];

  // bad
  const max = Math.max.apply(Math, numbers);

  // good
  const max = Math.max(...numbers);
  ```

### Arrow Functions

- [10.8](#10.8) <a name="10.8"></a> When you must use a function expression (for example, as an anonymous function in a callback), use arrow function notation.

  > Why? The function will execute without binding `this`, so it can use the `this` of its defining scope, which is usually what you want. It is also a more concise syntax, particularly for chained methods that take callbacks.

  ESLint rule: [`prefer-arrow-callback`](http://eslint.org/docs/rules/prefer-arrow-callback.html)

  ```js
  function takesCallback(callback) {
    callback();
  }

  // bad
  takesCallback(function() {
    console.log('This is no good!');
  });


  // good
  takesCallback(() => {
    console.log('Much better!');
  });
  ```

- [10.9](#10.9) <a name="10.9"></a> Always leave one space on either side of the arrow.

  ESLint rule: [`arrow-spacing`](http://eslint.org/docs/rules/arrow-spacing.html)

  ```js
  // bad
  (bad)=>{}
  (bad)=> {}
  (bad) =>{}
  (bad) =>'terrible'

  // good
  (good) => {}
  (good) => 'fabulous'
  ```

- [10.10](#10.10) <a name="10.10"></a> If the body of your arrow function takes only a single expression, you can omit the braces and make use of the implicit `return`. If your function’s body has more than one expression, it returns an object, or it returns something that spans multiple lines, you can use braces and an explicit `return`.

  ESLint rule: [`arrow-body-style`](http://eslint.org/docs/rules/arrow-body-style.html)

  ```js
  // bad
  const result = [1, 2, 3]
    .map((x) => {
      return (x * x) + 1;
    })
    .filter((x) => {
      return x < 6;
    });

  // doesn't return an object with `foo` key, actually returns nothing!
  runCallback((foo) => {foo});

  // good
  const result = [1, 2, 3]
    .map((x) => (x * x) + 1)
    .filter((x) => x < 6);

  runCallback((foo) => {
    return {foo};
  });
  ```

- [10.11](#10.11) <a name="10.11"></a> Always include parentheses around the arguments of an arrow function.

  > Why? Even though you can omit the parentheses around an arrow function with a single argument, it is better to maintain consistency with the zero-argument and multiple-argument cases for arrow functions, which require parentheses.

  ESLint rule: [`arrow-parens`](http://eslint.org/docs/rules/arrow-parens.html)

  ```js
  // bad
  [1, 2, 3].map(x => x * x);

  // good
  [1, 2, 3].map((x) => x * x);
  ```

### Parameters

- [10.12](#10.12) <a name="10.12"></a> Never use the implicitly defined `arguments` array-like object provided by functions. Instead, use rest syntax (`...`) to describe variadic arguments.

  ESLint rule: [`prefer-rest-params`](http://eslint.org/docs/rules/prefer-rest-params.html)

  > Why? `...` is explicit in which arguments you want pulled, and covers the boilerplate of assigning parameters out of `arguments`. It also provides an actual array, so all array prototype methods are available.

  ```js
  // bad
  function allThe() {
    const bads = Array.from(arguments);
    return bads.map((bad) => `${bad} is bad!`);
  }

  // good
  function allThe(...goods) {
    return goods.map((good) => `${good} is good!`);
  }
  ```

- [10.13](#10.13) <a name="10.13"></a> Use default arguments rather than mutating function arguments.

  > Why? The syntax makes it clear what you are trying to do, and you avoid the subtle bugs that can be introduced by checking whether a parameter was provided.

  ```js
  // bad
  function badOne(options) {
    {}; // might not be what you want for falsey `options`
  }

  function badTwo(options) {
    options = (options == null) ? {} : options;
  }

  // good
  function good(options = {}) {}
  ```

- [10.14](#10.14) <a name="10.14"></a> Avoid side effects or complex default parameters.

  > Why? They can be difficult to reason about and typically indicate that your function is doing too much.

  ```js
  let a = 1;

  // bad
  function badOne(b = a++) {}
  function badTwo(arg = [1, 2, 3].map((val) => val * 3)) {}

  // good
  function goodOne(b) {}
  goodOne(a++);

  function createDefaultParameter() {}
  function goodTwo(arg = createDefaultParameter()) {}
  ```

- [10.15](#10.15) <a name="10.15"></a> Always put default parameters last.

  ```js
  // bad
  function bad(options = {}, name) {}

  // good
  function good(name, options = {}) {}
  ```

- [10.16](#10.16) <a name="10.16"></a> Be careful not to overcomplicate function declarations using new object parameter-related features. While you can destructure, use the rest operator, provide default parameter values, provide a default argument, and provide different local names for parameters, limit your use of these such that your code remains readable. In general, avoid providing a complex default hash in addition to default parameter values.

  ```js
  // bad (parameter list is complex to reason about)
  function bad({
    foo: myFoo = 2,
    bar = 10000,
    ...otherOptions,
  } = {foo: 'foo', qux: true}) {}

  // good (this is probably the most complex structure that's acceptable)
  function good({foo = 2, bar = 10000, ...otherOptions} = {}) {}
  ```

[↑ scrollTo('#table-of-contents')](#table-of-contents)



## Types and casting

- [11.1](#11.1) <a name="11.1"></a> Use the `String` function to convert a value to a string.

  ESLint rules: [`no-implicit-coercion`](http://eslint.org/docs/rules/no-implicit-coercion.html), [`no-new-wrappers`](http://eslint.org/docs/rules/no-new-wrappers.html)

  ```js
  const number = 15;

  // bad
  const badStringNumOne = number + '';
  const badStringNumTwo = new String(number);

  // good
  const goodStringNum = String(number);
  ```

- [11.2](#11.2) <a name="11.2"></a> Use the `Number` function for type casting and `Number.parseInt` for parsing strings. Always include the radix parameter when using `Number.parseInt`.

  > Why? Forgetting to include the radix when your string starts with `0` or `0x` will result in it being parsed as an octal or hexadecimal number, respectively (which is not usually what you want). Providing a radix forces you to specify the way in which the string is parsed.

  ESLint rules: [`radix`](http://eslint.org/docs/rules/radix.html), [`no-implicit-coercion`](http://eslint.org/docs/rules/no-implicit-coercion.html), [`no-new-wrappers`](http://eslint.org/docs/rules/no-new-wrappers.html)

  ```js
  const input = '43';

  // bad
  const badOne = new Number(input);
  const badTwo = +input;
  const badThree = input >> 0;
  const badFour = Number.parseInt(input);
  const badFive = parseInt(input);

  // good
  const goodOne = Number(input);
  const goodTwo = Number.parseInt(input, 10);
  ```

- [11.3](#11.3) <a name="11.3"></a> Use the `Boolean` function for casting to a boolean value (or the relevant comparison operators, where possible). Never use double negation (`!!`), the `Boolean` constructor, or other “clever” techniques for getting a boolean value.

  ESLint rules: [`no-implicit-coercion`](http://eslint.org/docs/rules/no-implicit-coercion.html), [`no-new-wrappers`](http://eslint.org/docs/rules/no-new-wrappers.html), [`no-extra-boolean-cast`](http://eslint.org/docs/rules/no-extra-boolean-cast.html)

  ```js
  const collection = [];

  // bad
  const badOne = !!collection;
  const badTwo = new Boolean(collection);
  const badThree = ~collection.indexOf('foo');

  // good
  const goodOne = Boolean(collection);
  const goodTwo = collection.indexOf('foo') >= 0
  ```

- [11.4](#11.4) <a name="11.4"></a> Use `===` and `!==` over `==` and `!=`. The only exception to this rule is `== null`, which is allowed in order to check whether a reference is either `null` or `undefined`.

  > Why? `==` and `!=` perform type coercion, which can result in some unexpected comparions (for example, `[] == false` and `3 == '03'` evaluate to `true`). `===` and `!==` test for strict equality, which is almost always what you want.

  ESLint rule: [`eqeqeq`](http://eslint.org/docs/rules/eqeqeq.html)

  ```js
  // bad
  if (badValue == 3) {}

  // good
  if (goodValue === 3) {}
  ```

- [11.5](#11.5) <a name="11.5"></a> Don’t use shorthand boolean comparisons.

  > **Note**: remember that `false`, `undefined`, `null`, `''`, `0`, and `NaN` evaluate to `false`, and all other values evaluate to `true`.

  > Why? Using the shorthands relies on JavaScript’s questionable cooercion rules, which allow more values than you might expect to be treated as `false`. Using the explicit boolean check makes your code clearer to future readers.

  ```js
  const name = '';
  const collection = [];

  // bad
  if (name) {}
  if (collection.length) {}

  // good
  if (name !== '') {}
  if (name.length !== 0) {}
  if (collection.length > 0) {}
  ```

- [11.6](#11.6) <a name="11.6"></a> Use the following patterns for type checking:

  ```js
  // String
  typeof something === 'string';

  // Number
  typeof something === 'number';

  // Boolean
  typeof something === 'boolean';

  // Object
  something != null && typeof something === 'object';

  // Array
  Array.isArray(something);

  // Null
  something === null;

  // Undefined
  something === undefined;

  // Null or Undefined
  something == null;
  ```

[↑ scrollTo('#table-of-contents')](#table-of-contents)



## ESNext Features

- [12.1](#12.1) <a name="12.1"></a> When using features that are not natively supported in some target environments (typically, browsers), use [`core-js`](https://github.com/zloirock/core-js) to provide polyfills. **Do not** include the entire `core-js` shim; `core-js` is extremely modular and allows you to be selective of what polyfills you want to include based on the features you need and your [target environments' feature support](https://kangax.github.io/compat-table/es6/).

- [12.2](#12.2) <a name="12.2"></a> Limit use of generators and proxies, as these don’t transpile well (or at all) to ES5.

- [12.3](#12.3) <a name="12.3"></a> Prefer binary, octal, and hexadecimal literals over using `parseInt`.

  ESLint rule: [`prefer-numeric-literals`](http://eslint.org/docs/rules/prefer-numeric-literals.html)

  ```js
  // bad
  const twoSixtyFiveInHex = parseInt('1F7', 16);

  // good
  const twoSixtyFiveInHex = 0x1F7;
  ```

- [12.4](#12.4) <a name="12.4"></a> Always provide a description when creating a `Symbol`.

  > Why? You will get a more descriptive representation of that symbol in most developer tools.

  ESLint rule: [`symbol-description`](http://eslint.org/docs/rules/symbol-description.html)

  ```js
  // bad
  const badSymbol = Symbol();

  // good
  const goodSymbol = Symbol('Good!');
  ```

### Destructuring

- [12.5](#12.5) <a name="12.5"></a> Use object destructuring to retrieve multiple properties from an object.

  > Why? Destructuring removes a lot of boilerplate and encourages you to refer to properties by the same name everywhere they are referenced.

  ```js
  // bad
  function fullNameForUser(user) {
    const firstName = user.firstName;
    const lastName = user.lastName;

    return `${firstName} ${lastName}`;
  }

  // good
  function fullNameForUser(user) {
    const {firstName, lastName} = user;
    return `${firstName} ${lastName}`;
  }

  // best
  function fullNameForUser({firstName, lastName}) {
    return `${firstName} ${lastName}`;
  }
  ```

- [12.6](#12.6) <a name="12.6"></a> Use array destructuring rather than manually accessing items by their index. If your array has more than a few entries, and you are selecting only a small number of them, continue to use index notation.

  ```js
  const array = [1, 2];
  const longArray = [1, 2, 3, 4, 5];

  // bad
  const first = array[0];
  const second = array[1];

  const [secondLong,,,, fifthLong] = longArray;

  // good
  const [first, second] = array;

  const secondLong = longArray[1];
  const fifthLong = longArray[4];
  ```

- [12.7](#12.7) <a name="12.7"></a> If you need to return multiple values from a function, return them using an object rather than an array.

  > Why? Call sites that use destructuring to access your return values need to care about the ordering when returning an array, making them fragile to change.

  ```js
  // bad
  function positionForNode(node) {
    // figure stuff out
    return [left, right, top, bottom];
  }

  const [left, _, top] = positionForNode(node);

  // good
  function positionForNode(node) {
    // figure stuff out
    return {left, right, top, bottom};
  }

  const {left, top} = positionForNode(node);
  ```

- [12.8](#12.8) <a name="12.8"></a> You can create highly readable functions by using one positional argument, followed by a destructured object. You can even provide different local names for the destructured arguments to have both an expressive external API and concise internal references.

  ```js
  // fine, but too many positional arguments, so it's hard for call sites to know what to do
  function horizontalPosition(node, container, offset) {
    return container.offsetLeft + node.offsetLeft + offset.left;
  }

  horizontalPosition(node, node.parentNode, offset);

  // good: arguments are explicit
  function horizontalPositionForNode(node, {inContainer, withOffset}) {
    return inContainer.offsetLeft + node.offsetLeft + withOffset.left;
  }

  horizontalPositionForNode(node, {inContainer: node.parentNode, withOffset: offset});

  // also good: more concise internal names, same external API
  function horizontalPositionForNode(node, {inContainer: container, withOffset: offset}) {
    return container.offsetLeft + node.offsetLeft + offset.left;
  }

  horizontalPositionForNode(node, {inContainer: node.parentNode, withOffset: offset});
  ```

### Classes

- [12.9](#12.9) <a name="12.9"></a> Use classes with care: they do not behave in exactly the way you would expect in other languages, and JavaScript provides many mechanisms (closures, simple objects, etc) that solve problems for which you might use a class in another language. The rule of thumb is: use the right tool for the job!

  ```js
  // bad
  // all static members, no need for a class
  class BadSingleton {
    static singletonProp = 'foo';
    static singletonMethod() {
      return 'bar';
    }
  }

  // good
  const GoodSingleton = {
    singletonProp: 'foo',
    singletonMethod() {
      return 'bar';
    },
  };

  // bad
  // needlessly using a class to encapsulate data that could be passed to a function
  class BadChoice {
    constructor(first, second) {
      this.first = first;
      this.second = second;
    }

    takeAction() {
      return `The first: ${this.first}, the second: ${this.second}`;
    }
  }

  const result = new BadChoice('foo', 'bar').takeAction();

  // good
  function takeAction({first, second}) {
    return `The first: ${first}, the second: ${second}`;
  }

  const result = takeAction({first: 'foo', second: 'bar'});
  ```

- [12.10](#12.10) <a name="12.10"></a> If you want to use constructor functions, use `class` syntax. Avoid creating them by manually updating the prototype.

  > Why? `class` syntax is more concise and will be more familiar for developers trained in other languages.

  ```js
  // bad
  function BadClass() {
    this.isNotIdeal = true;
  }

  BadClass.prototype.shouldIDoThis = function() {
    return 'Definitely not';
  }

  // good
  class GoodClass {
    ideal = true;

    shouldIDoThis() {
      return 'Yes!';
    }
  }
  ```

- [12.11](#12.11) <a name="12.11"></a> If you are subclassing, your subclass’s constructor should always call `super` before referencing `this`.

  > Why? If your forget to call `super` in your subclass constructor, your object will be uninitialized and calling `this` will result in an exception.

  ESLint rule: [`no-this-before-super`](http://eslint.org/docs/rules/no-this-before-super.html)

  ```js
  class Base {}

  // bad
  class BadClass extends Base {
    constructor() {
      this.bad = bad();
      super('I am bad :(');
    }
  }

  // good
  class GoodClass extends Base {
    constructor() {
      super('I am good :)');
      this.good = good();
    }
  }
  ```

- [12.12](#12.12) <a name="12.12"></a> When declaring static members or properties, prefer the `static` keyword to direct assignment to the class object. Put `static` members at the top of your class definition.

  > Why? Using the `static` keyword is more expressive and keeps the entire class definition in one place.

  ```js
  // bad
  class BadClass {
    constructor() {}
    instanceMethod() {}
  }

  BadClass.staticProperty = 'foo';
  BadClass.staticMethod = function() {}

  // good
  class GoodClass {
    static staticProperty = 'foo';
    static staticMethod() {}

    constructor() {}
    instanceMethod() {}
  }
  ```

- [12.13](#12.13) <a name="12.13"></a> Instance methods that don’t refer to `this` don’t need to be instance methods. If they relate to the class, make them static methods; otherwise, make them functions in scope.

  > Why? This pattern is generally a sign that you are providing a bad public API for the class, and should either hide this method (if it’s an implementation detail) or expose it as a utility method.

  ESLint rule: [`class-methods-use-this`](http://eslint.org/docs/rules/class-methods-use-this.html)

  ```js
  // bad
  class BadClass {
    badMethod(string) {
      console.log(string.toUpperCase());
    }

    anotherMethod() {
      return this.badMethod('oops!');
    }
  }

  // good
  function goodFunction(string) {
    console.log(string.toUpperCase());
  }

  class GoodClass {
    anotherMethod() {
      return goodFunction('oops!');
    }
  }
  ```

### Modules

- [12.14](#12.14) <a name="12.14"></a> Always use modules (`import`/ `export`) over a non-standard module system (CommonJS being the most popular of these).

  > Why? Modules are the future, so let’s get a head start. You can always transpile to a preferred module system.

  ```js
  // bad
  const BadImport = require('./BadImport');
  module.exports = BadImport.feelBadAboutIt();

  // good
  import {feelGoodAboutIt} from './GoodImport';
  export default feelGoodAboutIt();
  ```

- [12.15](#12.15) <a name="12.15"></a> Avoid complex relative import paths. It is usually fairly easy and much clearer to add the root of your project to the load path.

  > Why? Relative paths are fragile and hard to parse for humans.

  ```js
  // bad
  export feelBadAboutIt from '../../../lib/BadImport';

  // good (with some path additions)
  import feelGoodAboutIt from 'lib/GoodImport';
  ```

[↑ scrollTo('#table-of-contents')](#table-of-contents)



## Project structure

- [13.1](#13.1) <a name="13.1"></a> Prefer dash-/kebab-case for file names. Pascal case is acceptable for naming files that export React components. For projects that are transitioning from CoffeeScript to JavaScript, it is also acceptable to use snake case for the file names in order to retain consistency.

- [13.2](#13.2) <a name="13.2"></a> Most tools, including Babel, ESLint, and Stylelint, allow you to specify your configuration in dotfiles at the root of your project, or as special keys in your `package.json`. Where possible, prefer placing this configuration in `package.json`. Where not possible (for example, when providing a custom ESLint configuration for a subdirectory), prefer the JavaScript version of the configuration over the dotfile version. Use dotfiles only when you have no other option.

  > Why? Placing configuration in package.json means that any developer can see all configuration in a single file, and cleans up the root of a directory.

  ```js
  // bad (my-project/.babelrc)
  {
    "plugins": ["shopify"]
  }

  // good (my-project/package.json)
  {
    "babel": {
      "plugins": ["shopify"]
    }
  }

  // bad (my-project/test/.eslintrc)
  {
    "env": {"mocha": true}
  }

  // good (my-project/test/.eslintrc.js)
  module.exports = {
    env: {mocha: true},
  };
  ```

[↑ scrollTo('#table-of-contents')](#table-of-contents)



## Resources

### Performance

Writing performant JavaScript is our top priority. No amount of well-structured, clean JavaScript can compensate for the end user having a bad experience. You can find a collection of great performance-related resources on the [FED resources page](https://github.com/Shopify/fed-sandbox/blob/master/docs/FED-resources.md#performance).

### Tools

- [ES6 Compatibility Table](https://kangax.github.io/compat-table/es6/) (shows browser, platform, and transpiler ES2015+ feature support)
- [ES6 Katas](http://es6katas.org) (learn ES6 by fixing tests)
- [Mocha](https://mochajs.org), [Chai](http://chaijs.com), and [Sinon](http://sinonjs.org), our preferred testing tools
- Editor Linting Plugins
  - [SublimeLinter-eslint](https://github.com/roadhump/SublimeLinter-eslint)
  - [linter-eslint for Atom](https://atom.io/packages/linter-eslint)
  - [ESLint for IntelliJ IDEs](http://plugins.jetbrains.com/plugin/7494)

### Books

- [JavaScript: The Good Parts](http://www.amazon.com/JavaScript-Good-Parts-Douglas-Crockford/dp/0596517742) by Douglas Crockford
- [You Don’t Know JS Book Series](https://github.com/getify/You-Dont-Know-JS) by Kyle Simpson
- [Eloquent JavaScript](http://eloquentjavascript.net) by Marijn Haverbeke
- [Exploring ES6](http://exploringjs.com) by Dr. Axel Rauschmayer
- [Learning JavaScript Design Patterns](https://addyosmani.com/resources/essentialjsdesignpatterns/book/) by Addy Osmani
- [JavaScript Testing Recipes](https://jstesting.jcoglan.com) by James Coglan

### Blogs

- [JavaScript Weekly](http://javascriptweekly.com/)
- [Addy Osmani](https://addyosmani.com/blog/)
- [Pony Foo](https://ponyfoo.com)
- [2ality](http://www.2ality.com)
- [Getify](http://blog.getify.com)
- [Rebecca Murphy](http://rmurphey.com)

### Articles

- **Promises**: [We have a problem with Promises](https://pouchdb.com/2015/05/18/we-have-a-problem-with-promises.html) by Nolan Lawson
- **Testing**: [Writing testable JavaScript](http://alistapart.com/article/writing-testable-javascript) by Rebecca Murphey

### Podcasts

- [Javascript Air](http://audio.javascriptair.com)
- [JavaScript Jabber](https://devchat.tv/js-jabber/)

### Other

- [Understanding Chrome DevTools](https://developers.google.com/web/tools/chrome-devtools/?hl=en)
- [ECMAScript current proposals](https://github.com/tc39/ecma262/blob/master/README.md), including the [stage 0 proposals](https://github.com/tc39/ecma262/blob/master/stage0.md)


[↑ scrollTo('#table-of-contents')](#table-of-contents)
