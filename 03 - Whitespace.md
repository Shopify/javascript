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

  let goodObject = {'is-good': true};
  goodObject['is-good'];

  let goodArray = [1, 2, 3];
  ```

[↑ scrollTo('#table-of-contents')](#table-of-contents)
