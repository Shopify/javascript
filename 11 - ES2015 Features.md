## ES2015 Features

- [11.1](#11.1) <a name="11.1"></a> When using features that are not natively supported in some target environments (typically, browsers), use [`core-js`](https://github.com/zloirock/core-js) to provide polyfills. **Do not** include the entire `core-js` shim; `core-js` is extremely modular and allows you to be selective of what polyfills you want to include based on the features you need and your [target environments' feature support](https://kangax.github.io/compat-table/es6/).

- [11.2](#11.2) <a name="11.2"></a> Avoid the use of iterators.

  > Why? Functions like `map` and `reduce` are generally better as they promote pure functions and immutability, reducing side effects.

  ESLint rule: [`no-iterator`](http://eslint.org/docs/rules/no-iterator.html)

  ```js
  let numbers = [1, 2, 3, 4, 5];

  // bad
  let sum = 0;
  for (let number of numbers) { sum += number; }

  // good
  let sum = numbers.reduce((total, number) => total + number, 0);
  ```

- [11.3](#11.3) <a name="11.3"></a> Limit use of generators and proxies, as these don't transpile well (or at all) to ES5.

### Destructuring

- [11.4](#11.4) <a name="11.4"></a> Use object destructuring to retrieve multiple properties from an object.

  > Why? Destructuring removes a lot of boilerplate and encourages you to refer to properties by the same name everywhere they are referenced.

  ```js
  // bad
  function fullNameForUser(user) {
    let firstName = user.firstName;
    let lastName = user.lastName;

    return `${firstName} ${lastName}`;
  }

  // good
  function fullNameForUser(user) {
    let {firstName, lastName} = user;
    return `${firstName} ${lastName}`;
  }

  // best
  function fullNameForUser({firstName, lastName}) {
    return `${firstName} ${lastName}`;
  }
  ```

- [11.5](#11.5) <a name="11.5"></a> Use array destructuring rather than manually accessing items by their index. If your array has more than a few entries, and you are selecting only a small number of them, continue to use index notation.

  ```js
  let array = [1, 2];
  let longArray = [1, 2, 3, 4, 5];

  // bad
  let first = array[0];
  let second = array[1];

  let [secondLong,,,, fifthLong] = longArray;

  // good
  let [first, second] = array;

  let secondLong = longArray[1];
  let fifthLong = longArray[4];
  ```

- [11.6](#11.6) <a name="11.6"></a> If you need to return multiple values from a function, return them using an object rather than an array.

  > Why? Call sites that use destructuring to access your return values need to care about the ordering when returning an array, making them fragile to change.

  ```js
  // bad
  function positionForNode(node) {
    // figure stuff out
    return [left, right, top, bottom];
  }

  let [left, _, top] = positionForNode(node);

  // good
  function positionForNode(node) {
    // figure stuff out
    return {left, right, top, bottom};
  }

  let {left, top} = positionForNode(node);
  ```

- [11.7](#11.7) <a name="11.7"></a> You can create highly readable functions by using one positional argument, followed by a destructured object. You can even provide different local names for the destructured arguments to have both an expressive external API and concise internal references.

  ```js
  // fine, but too many positional arguments, so it's hard for call sites to know what to do
  function horizontalPosition(node, container, offset) {
    return container.offsetLeft + node.offsetLeft + offset.left;
  }

  horizontalPosition(node, node.parentNode, offset);

  // good: arguments are explicit
  function horizontalPositionForNode(node, {inContainer, withOffset}) {
    return inContainer.offsetLeft + node.offsetLeft + withOffset.left;
  }

  horizontalPositionForNode(node, {inContainer: node.parentNode, withOffset: offset});

  // also good: more concise internal names, same external API
  function horizontalPositionForNode(node, {inContainer: container, withOffset: offset}) {
    return container.offsetLeft + node.offsetLeft + offset.left;
  }

  horizontalPositionForNode(node, {inContainer: node.parentNode, withOffset: offset});
  ```

### Classes

- [11.8](#11.8) <a name="11.8"></a> Use classes with care: they do not behave in exactly the way you would expect in other languages, and JavaScript provides many mechanisms (closures, simple objects, etc) that solve problems for which you might use a class in another language. The rule of thumb is: use the right tool for the job!

- [11.9](#11.9) <a name="11.9"></a> If you want to use constructor functions, use `class` syntax. Avoid creating them by manually updating the prototype.

  > Why? `class` syntax is more concise and will be more familiar for developers trained in other languages.

  ```js
  // bad
  function BadClass() {
    this.isNotIdeal = true;
  }

  BadClass.prototype.shouldIDoThis = function() {
    return 'Definitely not';
  }

  // good
  class GoodClass {
    constructor() {
      this.isIdeal = true;
    }

    shouldIDoThis() {
      return 'Yes!';
    }
  }
  ```

- [11.10](#11.10) <a name="11.10"></a> In your `class`'s constructor, always call `super` before referencing `this`.

  > Why? If your forget to call `super` in your subclass constructor, your object will be uninitialized and calling `this` will result in an exception.

  ESLint rule: [`no-this-before-super`](http://eslint.org/docs/rules/no-this-before-super.html)

  ```js
  class Base {}

  // bad
  class BadClass extends Base {
    constructor() {
      this.bad = true;
      super('I am bad :(');
    }
  }

  // good
  class GoodClass extends Base {
    constructor() {
      super('I am good :)');
      this.good = true;
    }
  }
  ```

- [11.11](#11.11) <a name="11.11"></a> When declaring static members or properties, prefer the `static` keyword to direct assignment to the class object. Put `static` members at the top of your class definition.

  > Why? Using the `static` keyword is more expressive and keeps the entire class definition in one place.

  ```js
  // bad
  class BadClass {
    constructor() {}
    instanceMethod() {}
  }

  BadClass.staticProperty = 'foo';
  BadClass.staticMethod = function() {}

  // good
  class GoodClass {
    static staticProperty = 'foo';
    static staticMethod() {}

    constructor() {}
    instanceMethod() {}
  }
  ```

### Modules

- [11.12](#11.12) <a name="11.12"></a> Always use modules (`import`/ `export`) over a non-standard module system (CommonJS being the most popular of these).

  > Why? Modules are the future, so let's get a head start. You can always transpile to a preferred module system.

  ```js
  // bad
  let BadImport = require('./BadImport');
  module.exports = BadImport.feelBadAboutIt;

  // good
  import {feelGoodAboutIt} from './GoodImport';
  export default feelGoodAboutIt;
  ```

- [11.13](#11.13) <a name="11.13"></a> Do not export directly from an import.

  > Why? Exporting directly from an import trades clarity for brevity, which is not a good trade to make when you are writing things for humans.

  ```js
  // bad
  export {feelBadAboutIt as default} from './BadImport';

  // good
  import {feelGoodAboutIt} from './GoodImport';
  export default feelGoodAboutIt;
  ```

[↑ scrollTo('#table-of-contents')](#table-of-contents)
