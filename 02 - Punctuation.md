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
