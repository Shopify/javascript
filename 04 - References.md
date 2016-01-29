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
