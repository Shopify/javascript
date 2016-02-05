## Naming

- [1.1](#1.1) <a name="1.1"></a> Use camelCase when naming functions, objects, and instances. Snake case is acceptable when interacting with an external API that provides objects with snake-cased keys, like Rails.

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

- [1.2](#1.2) <a name="1.2"></a> Use PascalCase when naming classes, factories, enumerations, or singletons (cases of enums are written in screaming snake case).

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

- [1.3](#1.3) <a name="1.3"></a> Use a leading underscore when naming "private" properties. Functions and variables in scope should be named normally.

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

- [1.4](#1.4) <a name="1.4"></a> Avoid single letter names; be descriptive with the names you choose. Note that exceptions can be made for common one-letter identifiers, particularly for use as properties (`x`, `y`, `i`, `j`, `_`).

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

- [1.5](#1.5) <a name="1.5"></a> Don’t save references to `this`. Use an arrow function (preferred) or `function#bind` instead.

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

- [1.6](#1.6) <a name="1.6"></a> When naming an event object, use `evt` (as opposed to `e` or `event`).

  ```js
  // bad
  function badHandleClickOne(e) {}
  function badHandleClickTwo(event) {}

  // good
  function goodHandleClick(evt) {}
  ```

[↑ scrollTo('#table-of-contents')](#table-of-contents)
