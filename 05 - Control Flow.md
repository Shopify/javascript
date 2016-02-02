## Control flow

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

- [5.4](#5.4) <a name="5.4"></a> Never have only a single `if` block within an `else` block; combine these into an `else if` block (or, if returning in the `if` block, as another `if` block).

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
