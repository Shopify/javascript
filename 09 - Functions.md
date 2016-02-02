## Functions

- [9.1](#9.1) <a name="9.1"></a> Never use the Function constructor to create a new function. Similarly, never use `eval`.

  > Why? Creating a function in this way evaluates the string as-is, allowing for vulnerabilities and making code harder to test.

  ESLint rules: [`no-new-func`](http://eslint.org/docs/rules/no-new-func.html), [`no-eval`](http://eslint.org/docs/rules/no-eval.html), [`no-implied-eval`](http://eslint.org/docs/rules/no-implied-eval.html)

  ```js
  // bad
  let add = new Function('a', 'b', 'return a + b');
  ```

- [9.2](#9.2) <a name="9.2"></a> Use function declarations instead of function expressions.

  > Why? Function declarations are named, so they’re easier to identify in call stacks. Also, the whole body of a function declaration is hoisted, whereas only the reference of a function expression is hoisted. This rule makes it possible to always use Arrow Functions in place of function expressions.

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

  > Why? It reduces redundancy since you don’t have to specify the object to apply against, and it mirrors the rest syntax when declaring variadic functions.

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
