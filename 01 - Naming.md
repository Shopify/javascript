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
