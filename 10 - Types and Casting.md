## Types and casting

- [10.1](#10.1) <a name="10.1"></a> Use the `String` function to convert a value to a string.

  ESLint rules: [`no-implicit-coercion`](http://eslint.org/docs/rules/no-implicit-coercion.html), [`no-new-wrappers`](http://eslint.org/docs/rules/no-new-wrappers.html)

  ```js
  const number = 15;

  // bad
  const badStringNumOne = number + '';
  const badStringNumTwo = new String(number);

  // good
  const goodStringNum = String(number);
  ```

- [10.2](#10.2) <a name="10.2"></a> Use the `Number` function for type casting and `Number.parseInt` for parsing strings. Always include the radix parameter when using `Number.parseInt`.

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

- [10.3](#10.3) <a name="10.3"></a> Use the `Boolean` function for casting to a boolean value (or the relevant comparison operators, where possible). Never use double negation (`!!`), the `Boolean` constructor, or other “clever” techniques for getting a boolean value.

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

- [10.4](#10.4) <a name="10.4"></a> Use `===` and `!==` over `==` and `!=`. The only exception to this rule is `== null`, which is allowed in order to check whether a reference is either `null` or `undefined`.

  > Why? `==` and `!=` perform type coercion, which can result in some unexpected comparions (for example, `[] == false` and `3 == '03'` evaluate to `true`). `===` and `!==` test for strict equality, which is almost always what you want.

  ESLint rule: [`eqeqeq`](http://eslint.org/docs/rules/eqeqeq.html)

  ```js
  // bad
  if (badValue == 3) {}

  // good
  if (goodValue === 3) {}
  ```

- [10.5](#10.5) <a name="10.5"></a> Don’t use shorthand boolean comparisons.

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
