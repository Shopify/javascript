## Punctuation

- [2.1](#2.1) <a name="2.1"></a> Always use semicolons.

  ESLint rule: [`semi`](http://eslint.org/docs/rules/semi.html)

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

- [2.2](#2.2) <a name="2.2"></a> Do not use leading commas.

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

- [2.3](#2.3) <a name="2.3"></a> Objects and arrays should use trailing commas, unless they are on a single line. Commas should always be followed by a space, but never preceded by one.

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

- [2.4](#2.4) <a name="2.4"></a> Never use commas to separate multiple statements.

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
