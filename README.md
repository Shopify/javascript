# `import JavaScript from 'Shopify'`

This repository contains everything you should need for writing JavaScript at Shopify. In it you'll find such things as our linting configs, custom linting rules, and project generators. Below, you'll find the most important thing: a living styleguide documenting how and why we write JavaScript the way we do.

> Why? All code in any code-base should look like a single person typed it, no matter how many people contributed. If we all follow along with the rules detailed below, we can focus our efforts on more meaningful problems.

Many of these rules are enforced by our [shared ESLint config](packages/eslint-config-shopify), which you can use in most editors and CI environments. We strongly encourage its use, and provide a [Yeoman generator](packages/generator-eslint-shopify) for quickly setting it up in your project.



## Table of Contents

1. [Naming](#naming)
1. [Punctuation](#punctuation)
1. [Whitespace](#whitespace)
1. [References](#references)
1. [Control Flow](#control-flow)
1. [Objects](#objects)
1. [Arrays](#arrays)
1. [Strings](#strings)
1. [Functions](#functions)
1. [Types and Casting](#types-and-casting)
1. [ES2015 Features](#es2015-features)
1. [Resources](#resources)

There are a few additional styleguides for libraries commonly used at Shopify that serve to augment this guide:

- [jQuery styleguide](jquery/)
- [React styleguide](react/)



## Naming

- [1.1](#1.1) <a name="1.1"></a> Use camelCase when naming functions, objects, and instances.

  ESLint rule: [`camelcase`](http://eslint.org/docs/rules/camelcase.html)

  ```js
  // bad
  let bad_snake_name = 'Larry';
  let UGLYname = 'this';

  // good
  let goodSnakeName = 'Basilisk';
  let prettyName = 'this';
  ```

- [1.2](#1.2) <a name="1.2"></a> Use PascalCase when naming classes, factories, or singletons.

  ESLint rule: [`new-cap`](http://eslint.org/docs/rules/new-cap.html)

  ```js
  // bad
  class badClass {}
  let bad = new badClass();

  let badType = {
    Water: 0,
    Fire: 1,
    Ghost: 2,
  };

  // good
  class GoodClass {}
  let good = new GoodClass();

  let Type = {
    Water: 0,
    Fire: 1,
    Ghost: 2,
  };
  ```

- [1.3](#1.3) <a name="1.3"></a> Use a leading underscore when naming "private" properties.

  > Why? The leading underscore sends a signal to other developers that these methods should not be called or relied upon. Some tools can also obfuscate methods with leading underscores to ensure that they are not called by outside objects.

  ESLint rule: [`no-underscore-dangle`](http://eslint.org/docs/rules/no-underscore-dangle.html)

  ```js
  // bad
  let bad = {
    __privateOne__: 0,
    privateTwo_: 1,
  };

  // good
  let good = {
    _private: 0,
  };
  ```

- [1.4](#1.4) <a name="1.4"></a> Avoid single letter names; be descriptive with the names you choose. Note that exceptions can be made for common one-letter identifiers, particularly for use as properties (`x`, `y`, `i`, `j`, `_`).

  ESLint rule: [`id-length`](http://eslint.org/docs/rules/id-length.html)

  ```js
  // bad
  let b = 'BAD';

  // good
  let good = 'GOOD';
  let point = {
    x: 10,
    y: 20,
  };
  ```

- [1.5](#1.5) <a name="1.5"></a> Don't save references to `this`. Use an arrow function (preferred) or `function#bind` instead.

  ```js
  // bad
  function bad() {
    let self = this;

    return function() {
      console.log(self);
    };
  }

  // good
  function good() {
    return () => { console.log(this) };
  }
  ```

- [1.6](#1.6) <a name="1.6"></a> When naming an event object, use `evt` (as opposed to `e` or `event`).

  ```js
  // bad
  function badHandleClickOne(e) {}
  function badHandleClickTwo(event) {}

  // good
  function goodHandleClick(evt) {}
  ```

[↑ scrollTo('#table-of-contents')](#table-of-contents)



## Punctuation

- [2.1](#2.1) <a name="2.1"></a> Always use semicolons.

  ESLint rule: [`semi`](http://eslint.org/docs/rules/semi.html)

  ```js
  // bad
  function bad() {
    let badChoice = 'No semicolons'
    return badChoice
  }

  // good
  function good() {
    let goodChoice = 'Semicolons';
    return goodChoice;
  }
  ```

- [2.2](#2.2) <a name="2.2"></a> Do not use leading commas.

  > Why? It's ugle to look at and trailing commas are a better solution to the same problems.

  ESLint rule: [`comma-style`](http://eslint.org/docs/rules/comma-style.html)

  ```js
  // bad
  let badOne = {
      one: 1
    , two: 2
    , three: 3
  };

  let badTwo = [
      1
    , 2
    , 3
  ];

  // good
  let goodOne = {
    one: 1,
    two: 2,
    three: 3,
  };

  let goodTwo = [
    1,
    2,
    3,
  ];
  ```

- [2.3](#2.3) <a name="2.3"></a> Objects and arrays should use trailing commas, unless they are on a single line. Commas should always be followed by a space, but never preceded by one.

  > Why? Trailing commas allow you to add and remove a given property of an object without also editing the surrounding lines, which keeps the change isolated to the property in question.

  ESLint rules: [`comma-dangle`](http://eslint.org/docs/rules/comma-dangle.html), [`comma-spacing`](http://eslint.org/docs/rules/comma-spacing.html)

  ```javascript
  // bad
  let badOne = {
    foo: 1,
    bar: 2
  };

  let badTwo = {foo: 1, bar: 2,};

  let badThree = [
    1,
    2
  ];

  let badFour = [1,2];

  // good
  let good = {
    foo: 1,
    bar: 2,
  };

  let goodTwo = {foo: 1, bar: 2};

  let goodThree = [
    1,
    2,
  ];

  let goodFour = [1, 2];
  ```

- [2.4](#2.4) <a name="2.4"></a> Never use commas to separate multiple statements.

  ESLint rule: [`no-sequences`](http://eslint.org/docs/rules/no-sequences.html)

  ```js
  // bad
  while (a = something(), a && a.length) {
    // do something
  }

  // good
  while (a = something()) {
    if (!a.length) { break; }
  }
  ```

[↑ scrollTo('#table-of-contents')](#table-of-contents)



## Whitespace

- [3.1](#3.1) <a name="3.1"></a> In general, add whitespace to improve legibility of code and to group statements together in a way that will produce a more coherent "story" for the next developer to look at code. **Never** optimize for code size: minifiers will do a much better job than you ever could.

- [3.2](#3.2) <a name="3.2"></a> Use two spaces for indentation.

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

- [3.3](#3.3) <a name="3.3"></a> Use braces for all blocks, including those that are on a single line.

  > Why? Requiring braces prevents issues when a second statement is added to a single-line block.

  ESLint rule: [`curly`](http://eslint.org/docs/rules/curly.html)

  ```js
  let condition = true;

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

- [3.4](#3.4) <a name="3.4"></a> Place one space before a leading brace. When using `if-else` and `try-catch` constructs, the second part starts on the same line as the closing brace of the first, with a single space between them.

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

- [3.5](#3.5) <a name="3.5"></a> Place one space before the opening parenthesis in control statements (`if`, `while`, etc). Place no space between the function name and argument list in function calls and declarations.

  ESLint rules: [`space-after-keywords`](http://eslint.org/docs/rules/space-after-keywords.html), [`space-before-keywords`](http://eslint.org/docs/rules/space-before-keywords.html)

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

- [3.6](#3.6) <a name="3.6"></a> All operators should be surrounded by spaces.

  ESLint rule: [`space-infix-ops`](http://eslint.org/docs/rules/space-infix-ops.html)

  ```js
  // bad
  let bad=34+32;

  // good
  let good = 1 + 2;
  ```

- [3.7](#3.7) <a name="3.7"></a> End files with a single newline character. Avoid any end-of-line whitespace.

  ESLint rules: [`eol-last`](http://eslint.org/docs/rules/eol-last.html), [`no-trailing-spaces`](http://eslint.org/docs/rules/no-trailing-spaces.html)

  ```js
  // bad-one.js
  let bad = true;
  ```

  ```js
  // bad-two.js
  let bad = true;↵
  ↵
  ```

  ```js
  // bad-three.js
  let bad = true;∙∙↵
  ```

  ```js
  // good.js
  let good = true;↵
  ```

- [3.8](#3.8) <a name="3.8"></a> Use indentation when dealing with long method chains. Use a leading dot on each new line.

  > Why? Breaking a method chain across lines improves readability. The leading dot clearly emphasizes that this is a method call, not a new statement.

  ESLint rule: [`dot-location`](http://eslint.org/docs/rules/dot-location.html)

  ```js
  let result = [1, 2, 3, 4, 5].filter((x) => x > 2).map((x) => x * x * x).reduce((total, x) => total + x, 0);

  // good
  let result = [1, 2, 3, 4, 5]
    .filter((x) => x > 2)
    .map((x) => x * x * x)
    .reduce((total, x) => total + x, 0);
  ```

- [3.9](#3.9) <a name="3.9"></a> Do not include extra space inside parentheses, brackets, or curly braces that define an object literal. Include spaces for curly braces that define a single-line function.

  ESLint rules: [`space-in-parens`](http://eslint.org/docs/rules/space-in-parens.html), [`array-bracket-spacing`](http://eslint.org/docs/rules/array-bracket-spacing.html), [`object-curly-spacing`](http://eslint.org/docs/rules/object-curly-spacing.html)

  ```js
  // bad
  function badFunction( arg ) {return true;}

  let badObject = { 'is-bad': true };
  badObject[ 'is-bad' ];

  let badArray = [ 1, 2, 3 ];

  // good
  function goodFunction(arg) { return true; }

  let goodObject = {'is-bad': true};
  goodObject['is-bad'];

  let goodArray = [1, 2, 3];
  ```

[↑ scrollTo('#table-of-contents')](#table-of-contents)



## References

- [4.1](#4.1) <a name="4.1"></a> Always use `let` or `const` (as described in the following rule) to declare variables. Forgetting to do so will result in global variables, which is bad news.

  ESLint rule: [`no-undef`](http://eslint.org/docs/rules/no-undef.html)

  ```js
  // bad
  bad = BadChoice();

  // good
  let good = GoodChoice()
  ```

- [4.2](#4.2) <a name="4.2"></a> Use `const` for immutable values (typically, only primitives) that semantically make sense as constants. Use `let` for everything else. Never use `var`.

  > Why? `const` and `let` are block scoped, rather than being function-scoped like `var`. `const` is misleading for mutable types (like `object`s), as it does not prevent you from modifying those objects' properties.

  ESLint rules: [`prefer-const`](http://eslint.org/docs/rules/prefer-const.html), [`no-const-assign`](http://eslint.org/docs/rules/no-const-assign.html), [`no-var`](http://eslint.org/docs/rules/no-var.html)

  ```javascript
  // bad
  var CONSTANT_VALUE = 1;
  var count = 0;
  if (true) {
    count += 1;
  }

  // good
  const CONSTANT_VALUE = 1;
  let count = 0;
  if (true) {
    count += 1;
  }
  ```

- [4.3](#4.3) <a name="4.3"></a> Always initialize variables on declaration. If a variable has no value until a later point, move the declartion (if possible) or, if not possible, initialize with `null`.

  > Why? This clearly indicates which variables are not defined at a given point, and improves consistency in variable initializations and declarations.

  ESLint rule: [`init-declarations`](http://eslint.org/docs/rules/init-declarations.html)

  ```js
  // bad
  let bad;
  // ...
  bad = 'bad';

  // good
  let goodOne = 'good';

  // or, if you can't provide a value immediately:
  let goodTwo = null;
  // ...
  goodTwo = 'good';
  ```

- [4.4](#4.4) <a name="4.4"></a> Don't refer a reference before it is defined. The only exception to this rule is for functions; use the hoisting feature of functions liberally to allow the primary export of a file to appear first (and any helper or utility functions it uses to appear afterwards).

  ESLint rule: [`no-use-before-define`](http://eslint.org/docs/rules/no-use-before-define.html)

  ```js
  // bad
  function bad() {
    return badVar;
  }

  let badVar = true;

  // good
  let goodVar = true;

  function good() {
    return goodVar;
  }
  ```

- [4.5](#4.5) <a name="4.5"></a> Use screaming snake case for constants to make it clear to users that they can't be modified.

  ```javascript
  // bad
  const constantValue = 1;

  // good
  const CONSTANT_VALUE = 1;
  ```

- [4.6](#4.6) <a name="4.6"></a> Declare each variable on its own line; never comma-separate your variables on a single line.

  > Why? Listing all variables on a single line makes it harder to scan, and encourages creating too many local variables.

  ESLint rule: [`one-var`](http://eslint.org/docs/rules/one-var.html).

  ```javascript
  // bad
  let foo = 'bar', baz = 'qux';

  // good
  let foo = 'bar';
  let baz = 'qux';
  ```

- [4.7](#4.7) <a name="4.7"></a> Never shadow variable names from outer scopes. Avoid shadowing of names with special meaning, like `arguments`.

  > Why? It makes the code harder to reason about because the purpose of a given variable changes with the scope, and introduces the opportunity for subtle bugs by assigning to the variable when you meant to redeclare it.

  ESLint rules: [`no-shadow`](http://eslint.org/docs/rules/no-shadow.html), [`no-shadow-restricted-names`](http://eslint.org/docs/rules/no-shadow-restricted-names.html)

  ```js
  // bad
  function bad() {
    let arguments = [];
    let foo = true;

    runCallback(() => {
      let foo = false;
      return true;
    });

    // what is `foo`?
  }

  // good
  function good() {
    let args = [];
    let foo = true;

    runCallback(() => {
      let callbackFoo = false;
      return false;
    });
  }
  ```

- [4.8](#4.8) <a name="4.8"></a> For a given section of code for which you are defining variables (typically, at the top of a block), group all `const` declarations that apply to that entire scope, then group all `let` declarations that apply to the entire scope.

  > Why? It is easier to see all variables that are used, and whether they are able to be re-assigned or not.

  ```js
  // bad
  let i = 0;
  const FOO = true;
  let bar = 'bar';
  someUnrelatedCall();
  const BAZ = false;

  // good
  const FOO = true;
  const BAZ = false;
  let i = 0;
  let bar = 'bar';

  someUnrelatedCall();
  ```

- [4.9](#4.9) <a name="4.9"></a> Assign variables at the point that you actually need them; that is, variables need not all be declared at the top of a given scope.

  ```js
  // bad
  function checkName(hasName) {
    let name = getName(); // unnecessary function call if `hasName` is `false`
    if (!hasName) { return false; }
    return name.length > 0;
  }

  // good
  function checkName(hasName) {
    if (!hasName) { return false; }
    let name = getName();
    return name.length > 0;
  }
  ```

[↑ scrollTo('#table-of-contents')](#table-of-contents)



## Control Flow

- [5.1](#5.1) <a name="5.1"></a> Never allow fallthrough in `switch` statements.

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

- [5.2](#5.2) <a name="5.2"></a> Never use labels or the `with` statement.

  ESLint rules: [`no-labels`](http://eslint.org/docs/rules/no-labels.html), [`no-with`](http://eslint.org/docs/rules/no-with.html)

  > Why? Using labels is generally indicative of code that is overly complex. The `with` statement makes it [difficuly for the reader](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Statements/with) to determine whether a given binding exists and, if it exists, in which scope or object it will be found. It is also not allowed in strict mode.

- [5.3](#5.3) <a name="5.3"></a> Never perform assignment in a condition.

  > Why? It can easily create confusion as to whether this was intended or was meant to be a comparison operation.

  ESLint rule: [`no-cond-assign`](http://eslint.org/docs/rules/no-cond-assign.html)

  ```js
  let myVar = null;

  // bad (did you mean `==`/ `===`?)
  if (myVar = doSomething()) {}

  // good
  myVar = doSomething();
  if (myVar) {}
  ```

- [5.4](#5.4) <a name="5.4"></a> Never have only a single `if` block within an `else` block; combine these into an `if else` block (or, if returning in the `if` block, as another `if` block).

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

- [5.5](#5.5) <a name="5.5"></a> Never nest ternary expressions. When such a complex calculation exists, it is usually best to break it into steps or to use a helper function to calculate the value.

  > Why? They produce incredibly hard to read code.

  ESLint rule: [`no-nested-ternary`](http://eslint.org/docs/rules/no-nested-ternary.html)

  ```js
  // bad
  let bad = someCondition ? (someOtherCondition ? 'foo' : 'bar') : (someFinalCondition ? 'baz' : 'qux');

  // good
  function calculateGood(someCondition, someOtherCondition, someFinalCondition) {
    if (someCondition) {
      return someOtherCondition ? 'foo' : 'bar';
    } else {
      return someFinalCondition ? 'baz' : 'qux';
    }
  }

  let good = calculateGood(someCondition, someOtherCondition, someFinalCondition);
  ```

[↑ scrollTo('#table-of-contents')](#table-of-contents)



## Objects

- [6.1](#6.1) <a name="6.1"></a> Use object literal syntax for object creation. Use `Object.create` in order to define objects with more complex property descriptors, or to set the object's prototype.

  ESLint rule: [`no-new-object`](http://eslint.org/docs/rules/no-new-object.html).

  ```javascript
  // bad
  let badOne = new Object();

  let badTwo = {};
  Object.defineProperty(badTwo, 'prop', {value: 10, enumerable: false});

  let badThree = {};
  Object.setPrototypeOf(badThree, badTwo);

  // good
  let goodOne = {};
  let goodTwo = Object.create(goodOne);
  let goodThree = Object.create({}, {
    value: 10,
    enumerable: false,
  });
  ```

- [6.2](#6.2) <a name="6.2"></a> Never include spaces before the colon in an object literal property declaration. Use one space after the colon or, if it improves readability to align values, indent the fewest number of spaces *after* the colon to align the values.

  ```javascript
  // bad
  let badOne = {
    foo : 1,
    bar:   2,
  };

  let badTwo = {
    short        : 3,
    longProperty : 4,
  };

  // good
  let goodOne = {
    foo: 1,
    bar: 2,
  };

  let goodTwo = {
    short:        3,
    longProperty: 4,
  };
  ```

- [6.3](#6.3) <a name="6.3"></a> Objects that span multiple lines should have one property per line with each property indented by one level. The closing brace should be on its own line, aligned with the column of the line on which the opening brace appeared.

  ESLint rule: [`indent`](http://eslint.org/docs/rules/indent.html)

  ```javascript
  // bad
  let badOne = {
    foo: 1, bar: 2,
  };

  let badTwo = {
      baz: 3, }

  // good

  let goodOne = {
    foo: 1,
    bar: 2,
  };

  let goodTwo = {
    baz: 3,
  };
  ```

- [6.4](#6.4) <a name="6.4"></a> Single-line object literals are permisible, but beware objects with more than a few, short keys: they can quickly become unreadable. Object literals on a single line should not have any spaces after the opening brace or before the closing brace.

  > Why? Objects on a single line use no interior spaces to differentiate them from functions (particular arrow functions) on a single line (which *should* have interior spaces between braces, if present).

  ESLint rules: [`object-curly-spacing`](http://eslint.org/docs/rules/object-curly-spacing.html), [`brace-style`](http://eslint.org/docs/rules/brace-style.html)

  ```javascript
  // bad
  let badOne = { foo: 1 };
  let badTwo = {bar: 2, baz: 3, qux: 4, manyMoreKeys: 5, evenMoreNowItGetsHardToRead: 6};

  // good
  let goodOne = {foo: 1};
  let goodTwo = {
    bar: 2,
    baz: 3,
    qux: 4,
    manyMoreKeys: 5,
    evenMoreNowItGetsHardToRead: 6,
  };
  ```

- [6.5](#6.5) <a name="6.5"></a> Use object method and property shorthands.

  > Why? It is shorter and removes visual noise for objects with many properties and methods.

  ESLint rule: [`object-shorthand`](http://eslint.org/docs/rules/object-shorthand.html)

  ```javascript
  let name = 'Fido';

  // bad
  let bad = {
    name: name,
    action: function() {
      return 'bite';
    },
  }

  // good
  let good = {
    name,
    action() {
      return "bark";
    },
  };
  ```

- [6.6](#6.6) <a name="6.6"></a> Use computed property names (unless using Flow, which does not yet support these yet).

  > Why? It allows you to define all properties in one place, and mirrors the way you would access those properties.

  ```javascript
  let propertyName = 'foo';

  // bad
  let bad = {};
  bad[propertyName] = true;

  // good
  let good = {
    [propertyName]: true,
  };
  ```

- [6.7](#6.7) <a name="6.7"></a> Use dot notation when possible. Use subscript notations (`[]`) only when your key is not a valid identifier or the key is stored in a variable.

  ```js
  let obj = {fooBar: 1, 'baz-qux': 2};

  // bad
  let fooBar = obj['fooBar'];

  // good
  let fooBar = obj.fooBar;
  let bazQux = obj['baz-qux'];

  let bazKey = 'baz-qux'
  let altBazQux = obj[bazKey];
  ```

- [6.8](#6.8) <a name="6.8"></a> When using object literals, place computed properties first, non-function properties second, and function properties third.

  > Why? It's easier to see which properties are using shorthand, and will generally result in increasing line length of property declarations (which is easier to scan than random line lengths).

  ```javascript
  let propertyOne = 1;
  let propertyTwo = function() {};

  // bad
  let bad = {
    doSomethingWithProperties() {},
    propertyOne,
    propertyThree: 3,
    propertyTwo,
  };

  // good
  let good = {
    propertyOne,
    propertyTwo,
    propertyThree: 3,
    doSomethingWithProperties() {},
  }
  ```

- [6.9](#6.9) <a name="6.9"></a> Only quote properties that are invalid identifiers.

  > Why? It's easier to read properties, matches well to how we encourage Ruby hashes with symbols to be written, and encourages you use camelcased, valid identifiers.

  ESLint rule: [`quote-props`](http://eslint.org/docs/rules/quote-props.html)

  ```javascript
  // bad
  let bad = {
    'foo': 1,
    'bar': 2,
    'data-baz': 3,
  };

  // good
  let good = {
    foo: 1,
    bar: 2,
    'data-baz': 3,
  };
  ```

[↑ scrollTo('#table-of-contents')](#table-of-contents)



## Arrays

- [7.1](#7.1) <a name="7.1"></a> Always use literal syntax for array creation.

  ESLint rule: [`no-array-constructor`](http://eslint.org/docs/rules/no-array-constructor.html)

  ```javascript
  // bad
  let bad = new Array();

  // good
  let good = [];
  ```

- [7.2](#7.2) <a name="7.2"></a> Do not insert spaces on the inside of array literals on a single line. Indent every item of an array literal that spans multiple lines by two spaces, and align the closing bracket to the column of the line that contains the opening bracket. If your array spans multiple lines, place only one item per line.

  > Why? These stylistic choices make array and object literal declarations visually consistent with one another.

  ESLint rule: [`array-bracket-spacing`](http://eslint.org/docs/rules/array-bracket-spacing.html)

  ```javascript
  // bad
  let badOne = [ 1, 2 ];
  let badTwo = [
    3,
    4, 5,
    ]

  // good
  let goodOne = [1, 2];
  let goodTwo = [
    3,
    4,
    5,
  ];
  ```

- [7.3](#7.3) <a name="7.3"></a> Use `Array#push` instead of direct assignment to add items to an array.

  ```javascript
  let myArray = [];

  // bad
  myArray[myArray.length] = 'bad';

  // good
  myArray.push('good');
  ```

- [7.4](#7.4) <a name="7.4"></a> Use the spread operator (`...`) to copy arrays, rather than iterating over the array or using `Array#slice`. If you need subsections of the array, continue to use `Array#slice`.

  ```javascript
  let originalArray = [1, 2, 3];

  // bad
  let badNewArray = [];
  originalArray.forEach((item) => badNewArray.push(item));
  let otherBadNewArray = originalArray.slice();

  // good
  let goodNewArray = [...originalArray];
  ```

- [7.5](#7.5) <a name="7.5"></a> To convert from an array-like object to an array (for example, a `NodeList` returned by `document.querySelectorAll`, or a jQuery object), use `Array.from`.

  ```javascript
  let nodes = document.querySelectorAll('.my-nodes');

  // bad
  let badNodesArray = [].slice.apply(nodes);

  // good
  let goodNodesArray = Array.from(nodes);
  ```

[↑ scrollTo('#table-of-contents')](#table-of-contents)



## Strings

- [8.1](#8.1) <a name="8.1"></a> Use single quotes for strings. Using double quotes is acceptable only to avoid escaping contained single quotes.

  > Why? We don't want to argue about this. Like, ever. Please use single quotes!

  ESLint rule: [`quotes`](http://eslint.org/docs/rules/quotes.html)

  ```javascript
  // bad
  let badOne = "Sorry not sorry";
  let badTwo = `No interpolation, no need`;
  let badThree = 'Escaping is \'no good\'';

  // good
  let goodOne = 'Nice and clean';
  let goodTwo = 'No interpolation, no backticks';
  let goodThree = "Double quotes are 'fine' in this case.";
  ```

- [8.2](#8.2) <a name="8.2"></a> Avoid long strings if possible. If you must include a long string, you can include multiline strings in code using backticks (`\``). If the whitespace of multiline strings is unacceptable, you can use multiline string concatenation or an array of reasonable-length strings joined together.

  ```javascript
  // bad
  let badString = 'The path of the righteous man is beset on all sides by the iniquities of the selfish and the tyranny of evil men. Blessed is he who, in the name of charity and good will, shepherds the weak through the valley of darkness'

  // fine, if newlines are acceptable
  let fineString = `
    The path of the righteous man is beset on all sides by the iniquities of the selfish and the tyranny of evil men.
    Blessed is he who, in the name of charity and good will, shepherds the weak through the valley of darkness
  `;

  // good
  let goodStringOne = 'The path of the righteous man is beset on all sides ' +
    'by the iniquities of the selfish and the tyranny of evil men. ' +
    'Blessed is he who, in the name of charity and good will, ' +
    'shepherds the weak through the valley of darkness';
  ```

- [8.3](#8.3) <a name="8.3"></a> Use template strings instead of concatenation.

  > Why? The template string syntax is easier to read and consistent with how we build strings programatically in other languages.

  ESLint rule: [`prefer-template`](http://eslint.org/docs/rules/prefer-template.html)

  ```javascript
  let name = 'Chris';

  // bad
  let badOne = 'DO NOT do it this way, ' + name + '!';
  let badTwo = ['And definitely not this way, either, ', name, '!'].join('');

  // good
  let goodOne = `Much better, ${name}!`;
  ```

[↑ scrollTo('#table-of-contents')](#table-of-contents)



## Functions

- [9.1](#9.1) <a name="9.1"></a> Never use the Function constructor to create a new function. Similarly, never use `eval`.

  > Why? Creating a function in this way evaluates the string as-is, allowing for vulnerabilities and making code harder to test.

  ESLint rules: [`no-new-func`](http://eslint.org/docs/rules/no-new-func.html), [`no-eval`](http://eslint.org/docs/rules/no-eval.html), [`no-implied-eval`](http://eslint.org/docs/rules/no-implied-eval.html)

  ```js
  // bad
  let add = new Function('a', 'b', 'return a + b');
  ```

- [9.2](#9.2) <a name="9.2"></a> Use function declarations instead of function expressions.

  > Why? Function declarations are named, so they're easier to identify in call stacks. Also, the whole body of a function declaration is hoisted, whereas only the reference of a function expression is hoisted. This rule makes it possible to always use Arrow Functions in place of function expressions.

  ESLint rule: [`func-style`](http://eslint.org/docs/rules/func-style.html)

  ```js
  // bad
  let bad = function() {}

  // good
  function good() {}
  ```

- [9.3](#9.3) <a name="9.3"></a> Use Immediately Invoked Function Expressions (IIFE) as a way to keep some variables private from the rest of your script. When using IIFEs, always wrap them in parentheses with dangling parentheses.

  > **Note**: If using modules, the module (file) itself serves as a private scope for variables. As such, IIFEs are rarely needed in this case.

  ESLint rule: [`wrap-iife`](http://eslint.org/docs/rules/wrap-iife.html)

  ```js
  // bad
  ;function() {
    let privateMember = 'foo';
  }()

  (function() {
    let privateMember = 'foo';
  }())

  // good
  (function() {
    let privateMember = 'foo';
  })()
  ```

- [9.4](#9.4) <a name="9.4"></a> Anonymous functions leave no space between the `function` keyword and the parentheses. All functions have no spaces around their list of parameters, and a single space between the closing paren of the parameter list and the opening curly brace.

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

- [9.5](#9.5) <a name="9.5"></a> Never declare a function in a non-function block (`if`, `while`, etc). Assign the function to a variable instead.

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
  let test = null;
  if (true) {
    test = () => console.log('This is better!');
  }
  ```

- [9.6](#9.6) <a name="9.6"></a> Functions should either always return a value, or never return a value. If a function optionally returns something, return `null` in the case where the relevant conditions were not met.

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

- [9.7](#9.7) <a name="9.7"></a> Instead of using `function#apply()` to call a function with an array of arguments, use the spread operator.

  > Why? It reduces redundancy since you don't have to specify the object to apply against, and it mirrors the rest syntax when declaring variadic functions.

  ESLint rule: [`prefer-spread`](http://eslint.org/docs/rules/prefer-spread.html)

  ```js
  let numbers = [1, 2, 3, 4, 5];

  // bad
  let max = Math.max.apply(Math, numbers);

  // good
  let max = Math.max(...numbers);
  ```

### Arrow Functions

- [9.8](#9.8) <a name="9.8"></a> When you must use a function expression (for example, as an anonymous function in a callback), use arrow function notation.

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

- [9.9](#9.9) <a name="9.9"></a> Always leave one space on either side of the arrow.

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

- [9.10](#9.10) <a name="9.10"></a> If the body of your arrow function takes only a single expression, omit the braces and make use of the implicit `return`. If you are returning an object, however, you must use braces and an explicit `return`.

  > Why? It reads better when multiple such functions are chained together.

  ESLint rule: [`arrow-body-style`](http://eslint.org/docs/rules/arrow-body-style.html)

  ```js
  // bad
  [1, 2, 3]
    .map((x) => {
      return (x * x) + 1;
    })
    .filter((x) => {
      return x < 6;
    });

  // doesn't return an object with `foo` key, actually returns nothing!
  runCallback((foo) => {foo});

  // good
  [1, 2, 3]
    .map((x) => (x * x) + 1)
    .filter((x) => x < 6);

  runCallback((foo) => {
    return {foo};
  });
  ```

- [9.11](#9.11) <a name="9.11"></a> Always include parentheses around the arguments of an arrow function.

  > Why? Even though you can omit the parentheses around an arrow function with a single argument, it is better to maintain consistency with the zero-argument and multiple-argument cases for arrow functions, which require parentheses.

  ESLint rule: [`arrow-parens`](http://eslint.org/docs/rules/arrow-parens.html)

  ```js
  // bad
  [1, 2, 3].map(x => x * x);

  // good
  [1, 2, 3].map((x) => x * x);
  ```

### Parameters

- [9.12](#9.12) <a name="9.12"></a> Never use the implicitly defined `arguments` array-like object provided by functions. Instead, use rest syntax (`...`) to describe variadic arguments.

  > Why? `...` is explicit in which arguments you want pulled, and covers the boilerplate of assigning parameters out of `arguments`. It also provides an actual array, so all array prototype methods are available.

  ```js
  // bad
  function allThe() {
    let bads = Array.from(arguments);
    return bads.map((bad) => `${bad} is bad!`);
  }

  // good
  function allThe(...goods) {
    return goods.map((good) => `${good} is good!`);
  }
  ```

- [9.13](#9.13) <a name="9.13"></a> Use default arguments rather than mutating function arguments.

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

- [9.14](#9.14) <a name="9.14"></a> Avoid side effects or complex default parameters.

  > Why? They can be difficult to reason about and typically indicate that your function is doing too much.

  ```js
  let a = 1;

  // bad
  function badOne(b = a++) {}
  function badTwo(arg = createDefaultArgument()) {}
  ```

  - Always put default parameters last.

  ```js
  // bad
  function bad(options = {}, name) {}

  // good
  function good(name, options = {}) {}
  ```

[↑ scrollTo('#table-of-contents')](#table-of-contents)



## Types and Casting

- [10.1](#10.1) <a name="10.1"></a> Use the `String` function to convert a value to a string.

  ESLint rules: [`no-implicit-coercion`](http://eslint.org/docs/rules/no-implicit-coercion.html), [`no-new-wrappers`](http://eslint.org/docs/rules/no-new-wrappers.html)

  ```js
  let number = 15;

  // bad
  let badStringNumOne = number + '';
  let badStringNumTwo = new String(number);

  // good
  let goodStringNum = String(number);
  ```

- [10.2](#10.2) <a name="10.2"></a> Use the `Number` function for type casting and `Number.parseInt` for parsing strings. Always include the radix parameter when using `Number.parseInt`.

  > Why? Forgetting to include the radix when your string starts with `0` or `0x` will result in it being parsed as an octal or hexadecimal number, respectively (which is not usually what you want). Providing a radix forces you to specify the way in which the string is parsed.

  ESLint rules: [`radix`](http://eslint.org/docs/rules/radix.html), [`no-implicit-coercion`](http://eslint.org/docs/rules/no-implicit-coercion.html), [`no-new-wrappers`](http://eslint.org/docs/rules/no-new-wrappers.html)

  ```js
  let input = '43';

  // bad
  let badOne = new Number(input);
  let badTwo = +input;
  let badThree = input >> 0;
  let badFour = Number.parseInt(input);
  let badFive = parseInt(input);

  // good
  let goodOne = Number(input);
  let goodTwo = Number.parseInt(input, 10);
  ```

- [10.3](#10.3) <a name="10.3"></a> Use the `Boolean` function for casting to a boolean value. Never use double negation (`!!`), the `Boolean` constructor, or other "clever" techniques for getting a boolean value.

  ESLint rules: [`no-implicit-coercion`](http://eslint.org/docs/rules/no-implicit-coercion.html), [`no-new-wrappers`](http://eslint.org/docs/rules/no-new-wrappers.html), [`no-extra-boolean-cast`](http://eslint.org/docs/rules/no-extra-boolean-cast.html)

  ```js
  let collection = [];

  // bad
  let badOne = !!collection.length;
  let badTwo = new Boolean(collection.length);
  let badThree = ~collection.indexOf('foo');

  // good
  let good = Boolean(collection.length); // or, just use `collection.length`
  ```

- [10.4](#10.4) <a name="10.4"></a> Use `===` and `!==` over `==` and `!=`. The only exception to this rule is `== null`, which is allowed in order to check whether a reference is either `null` or `undefined`.

  > Why? `==` and `!=` perform type coercion, which can result in some unexpected comparions (for example, `[] == false` and `3 == '03'` evaluate to `true`). `===` and `!==` test for strict equality, which is almost always what you want.

  ESLint rule: [`eqeqeq`](http://eslint.org/docs/rules/eqeqeq.html)

  ```js
  // bad
  if (badValue == 3) {}

  // good
  if (goodValue === 3) {}
  ```

- [10.5](#10.5) <a name="10.5"></a> Use shorthand boolean comparisons.

  > **Note**: remember that `false`, `undefined`, `null`, `''`, `0`, and `NaN` evaluate to `false`, and all other values evaluate to `true`.

  ```js
  let name = '';
  let collection = [];

  // bad
  if (name !== '') {}
  if (collection.length > 0) {}

  // good
  if (name) {}
  if (collection.length) {}
  ```

- [10.6](#10.6) <a name="10.6"></a> Use the following patterns for type checking:

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



## ES2015 Features

- [11.1](#11.1) <a name="11.1"></a> When using features that are not natively supported in some target environments (typically, browsers), use [`core-js`](https://github.com/zloirock/core-js) to provide polyfills. **Do not** include the entire `core-js` shim; `core-js` is extremely modular and allows you to be selective of what polyfills you want to include based on the features you need and your [target environments' feature support](https://kangax.github.io/compat-table/es6/).

- [11.2](#11.2) <a name="11.2"></a> Avoid the use of iterators.

  > Why? Functions like `map` and `reduce` are generally better as they promote pure functions and immutability, reducing side effects.

  ESLint rule: [`no-iterator`](http://eslint.org/docs/rules/no-iterator.html)

  ```js
  let numbers = [1, 2, 3, 4, 5];

  // bad
  let sum = 0;
  for (let number of numbers) { sum += number; }

  // good
  let sum = numbers.reduce((total, number) => total + number, 0);
  ```

- [11.3](#11.3) <a name="11.3"></a> Limit use of generators and proxies, as these don't transpile well (or at all) to ES5.

### Destructuring

- [11.4](#11.4) <a name="11.4"></a> Use object destructuring to retrieve multiple properties from an object.

  > Why? Destructuring removes a lot of boilerplate and encourages you to refer to properties by the same name everywhere they are referenced.

  ```js
  // bad
  function fullNameForUser(user) {
    let firstName = user.firstName;
    let lastName = user.lastName;

    return `${firstName} ${lastName}`;
  }

  // good
  function fullNameForUser(user) {
    let {firstName, lastName} = user;
    return `${firstName} ${lastName}`;
  }

  // better
  function fullNameForUser({firstName, lastName}) {
    return `${firstName} ${lastName}`;
  }
  ```

- [11.5](#11.5) <a name="11.5"></a> Use array destructuring rather than manually accessing items by their index. If your array has more than a few entries, and you are selecting only a small number of them, continue to use index notation.

  ```js
  let array = [1, 2];
  let longArray = [1, 2, 3, 4, 5];

  // bad
  let first = array[0];
  let second = array[1];

  let [secondLong,,,, fifthLong] = longArray;

  // good
  let [first, second] = array;

  let secondLong = longArray[1];
  let fifthLong = longArray[4];
  ```

- [11.6](#11.6) <a name="11.6"></a> If you need to return multiple values from a function, return them using an object rather than an array.

  > Why? Call sites that use destructuring to access your return values need to care about the ordering when returning an array, making them fragile to change.

  ```js
  // bad
  function positionForNode(node) {
    // figure stuff out
    return [left, right, top, bottom];
  }

  let [left, _, top] = positionForNode(node);

  // good
  function positionForNode(node) {
    // figure stuff out
    return {left, right, top, bottom};
  }

  let {left, top} = positionForNode(node);
  ```

- [11.7](#11.7) <a name="11.7"></a> You can create highly readable functions by using one positional argument, followed by a destructured object. You can even provide different local names for the destructured arguments to have both an expressive external API and concise internal references.

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

- [11.8](#11.8) <a name="11.8"></a> Use classes with care: they do not behave in exactly the way you would expect in other languages, and JavaScript provides many mechanisms (closures, simple objects, etc) that solve problems for which you might use a class in another language. The rule of thumb is: use the right tool for the job!

- [11.9](#11.9) <a name="11.9"></a> If you want to use constructor functions, use `class` syntax. Avoid creating them by manually updating the prototype.

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
    constructor() {
      this.isIdeal = true;
    }

    shouldIDoThis() {
      return 'Yes!';
    }
  }
  ```

- [11.10](#11.10) <a name="11.10"></a> In your `class`'s constructor, always call `super` before referencing `this`.

  > Why? If your forget to call `super` in your subclass constructor, your object will be uninitialized and calling `this` will result in an exception.

  ESLint rule: [`no-this-before-super`](http://eslint.org/docs/rules/no-this-before-super.html)

  ```js
  class Base {}

  // bad
  class BadClass extends Base {
    constructor() {
      this.bad = true;
      super('I am bad :(');
    }
  }

  // good
  class GoodClass extends Base {
    constructor() {
      super('I am good :)');
      this.good = true;
    }
  }
  ```

### Modules

- [11.11](#11.11) <a name="11.11"></a> Always use modules (`import`/ `export`) over a non-standard module system (CommonJS being the most popular of these).

  > Why? Modules are the future, so let's get a head start. You can always transpile to a preferred module system.

  ```js
  // bad
  let BadImport = require('./BadImport');
  module.exports = BadImport.feelBadAboutIt;

  // good
  import {feelGoodAboutIt} from './GoodImport';
  export default feelGoodAboutIt;
  ```

- [11.12](#11.12) <a name="11.12"></a> Do not export directly from an import.

  > Why? Exporting directly from an import trades clarity for brevity, which is not a good trade to make when you are writing things for humans.

  ```js
  // bad
  export {feelBadAboutIt as default} from './BadImport';

  // good
  import {feelGoodAboutIt} from './GoodImport';
  export default feelGoodAboutIt;
  ```

[↑ scrollTo('#table-of-contents')](#table-of-contents)



## Resources

### Tools

- [ES6 Compatibility Table](https://kangax.github.io/compat-table/es6/) (shows browser, platform, and transpiler ES2015+ feature support)
- [ES6 Katas](http://es6katas.org) (learn ES6 by fixing tests)
- Editor Linting Plugins
  - [SublimeLinter-eslint](https://github.com/roadhump/SublimeLinter-eslint)
  - [linter-eslint for Atom](https://atom.io/packages/linter-eslint)
  - [ESLint for IntelliJ IDEs](http://plugins.jetbrains.com/plugin/7494)

### Books

- [JavaScript: The Good Parts](http://www.amazon.com/JavaScript-Good-Parts-Douglas-Crockford/dp/0596517742) by Douglas Crockford
- [You Don't Know JS Book Series](https://github.com/getify/You-Dont-Know-JS) by Kyle Simpson
- [Eloquent JavaScript](http://eloquentjavascript.net) by Marijn Haverbeke
- [Exploring ES6](http://exploringjs.com) by Dr. Axel Rauschmayer

### Blogs

- [JavaScript Weekly](http://javascriptweekly.com/)
- [Addy Osmani](https://addyosmani.com/blog/)
- [Pony Foo](https://ponyfoo.com)
- [2ality](http://www.2ality.com)
- [Getify](http://blog.getify.com)
- [Rebecca Murphy](http://rmurphey.com)

### Podcasts

- [Javascript Air](http://audio.javascriptair.com)
- [JavaScript Jabber](https://devchat.tv/js-jabber/)


[↑ scrollTo('#table-of-contents')](#table-of-contents)
