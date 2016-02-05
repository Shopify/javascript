## Objects

- [6.1](#6.1) <a name="6.1"></a> Use object literal syntax for object creation. Use `Object.create` in order to define objects with more complex property descriptors, or to set the object’s prototype.

  ESLint rule: [`no-new-object`](http://eslint.org/docs/rules/no-new-object.html).

  ```javascript
  // bad
  const badOne = new Object();

  const badTwo = {};
  Object.setPrototypeOf(badTwo, badOne);

  const badThree = {};
  Object.defineProperty(badThree, 'prop', {value: 10, enumerable: false});

  // good
  const goodOne = {};
  const goodTwo = Object.create(goodOne);
  const goodThree = Object.create({}, {
    value: 10,
    enumerable: false,
  });
  ```

- [6.2](#6.2) <a name="6.2"></a> Never include spaces before the colon in an object literal property declaration. Use one space after the colon or, if it improves readability to align values, indent the fewest number of spaces *after* the colon to align the values.

  ```javascript
  // bad
  const badOne = {
    foo : 1,
    bar:   2,
  };

  const badTwo = {
    short        : 3,
    longProperty : 4,
  };

  // good
  const goodOne = {
    foo: 1,
    bar: 2,
  };

  const goodTwo = {
    short:        3,
    longProperty: 4,
  };
  ```

- [6.3](#6.3) <a name="6.3"></a> Objects that span multiple lines should have one property per line with each property indented by one level. The closing brace should be on its own line, aligned with the column of the line on which the opening brace appeared.

  ESLint rule: [`indent`](http://eslint.org/docs/rules/indent.html)

  ```javascript
  // bad
  const badOne = {
    foo: 1, bar: 2,
  };

  const badTwo = {
      baz: 3, }

  // good

  const goodOne = {
    foo: 1,
    bar: 2,
  };

  const goodTwo = {
    baz: 3,
  };
  ```

- [6.4](#6.4) <a name="6.4"></a> Single-line object literals are permissible, but beware objects with more than a few, short keys: they can quickly become unreadable. Object literals on a single line should not have any spaces after the opening brace or before the closing brace.

  > Why? Objects on a single line use no interior spaces to differentiate them from functions (particular arrow functions) on a single line (which *should* have interior spaces between braces, if present).

  ESLint rules: [`object-curly-spacing`](http://eslint.org/docs/rules/object-curly-spacing.html), [`brace-style`](http://eslint.org/docs/rules/brace-style.html)

  ```javascript
  // bad
  const badOne = { foo: 1 };
  const badTwo = {bar: 2, baz: 3, qux: 4, manyMoreKeys: 5, evenMoreNowItGetsHardToRead: 6};

  // good
  const goodOne = {foo: 1};
  const goodTwo = {
    bar: 2,
    baz: 3,
    qux: 4,
    manyMoreKeys: 5,
    evenMoreNowItGetsHardToRead: 6,
  };
  ```

- [6.5](#6.5) <a name="6.5"></a> Use object method and property shorthands.

  > Why? It is shorter and removes visual noise for objects with many properties and methods.

  ESLint rule: [`object-shorthand`](http://eslint.org/docs/rules/object-shorthand.html)

  ```javascript
  const name = 'Fido';

  // bad
  const bad = {
    name: name,
    action: function() {
      return 'bite';
    },
  }

  // good
  const good = {
    name,
    action() {
      return "bark";
    },
  };
  ```

- [6.6](#6.6) <a name="6.6"></a> Use computed property names (unless using Flow, which does not yet support these yet).

  > Why? It allows you to define all properties in one place, and mirrors the way you would access those properties.

  ```javascript
  const propertyName = 'foo';

  // bad
  const bad = {};
  bad[propertyName] = true;

  // good
  const good = {
    [propertyName]: true,
  };
  ```

- [6.7](#6.7) <a name="6.7"></a> Use dot notation when possible. Use subscript notations (`[]`) only when your key is not a valid identifier or the key is stored in a variable.

  ```js
  const obj = {fooBar: 1, 'baz-qux': 2};

  // bad
  const fooBar = obj['fooBar'];

  // good
  const fooBar = obj.fooBar;
  const bazQux = obj['baz-qux'];

  const bazKey = 'baz-qux'
  const altBazQux = obj[bazKey];
  ```

- [6.8](#6.8) <a name="6.8"></a> When using object literals, place computed properties first, non-function properties second, and function properties third.

  > Why? It’s easier to see which properties are using shorthand, and will generally result in increasing line length of property declarations (which is easier to scan than random line lengths).

  ```javascript
  const propertyOne = 1;
  function propertyTwo() {};

  // bad
  const bad = {
    doSomethingWithProperties() {},
    propertyOne,
    propertyThree: 3,
    propertyTwo,
  };

  // good
  const good = {
    propertyOne,
    propertyTwo,
    propertyThree: 3,
    doSomethingWithProperties() {},
  }
  ```

- [6.9](#6.9) <a name="6.9"></a> Only quote properties that are invalid identifiers.

  > Why? It’s easier to read properties, matches well to how we encourage Ruby hashes with symbols to be written, and encourages you use camelCased, valid identifiers.

  ESLint rule: [`quote-props`](http://eslint.org/docs/rules/quote-props.html)

  ```javascript
  // bad
  const bad = {
    'foo': 1,
    'bar': 2,
    'some-invalid-identifier': 3,
  };

  // good
  const good = {
    foo: 1,
    bar: 2,
    'some-invalid-identifier': 3,
  };
  ```

[↑ scrollTo('#table-of-contents')](#table-of-contents)
