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
