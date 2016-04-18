# Legacy JavaScript Styleguide

This guide is a snapshot of our "legacy" JavaScript styleguide. Any new projects should use the [newer styleguide](../), but projects that have a lot of existing code can continue to use the guide below. Note that some rules in this guide may conflict with the [shared ESLint configuration](../plugin/eslint-config-shopify), as it is configured to match our newer styleguide.

### TL;DR (details and rationale follow below)

#### Whitespace:
```javascript
if (condition === 'foo') {
  // statements
}

// Note the space before function params. Intended to distinguish between
// function invocation 'function()' and declaration.
var fooBar = function () {
  // statements
};

_.each(items, function (item, index) {
  // statements
});

// Spacing between sibling functions, no newlines immediately inside of function declarations
describe('foo', function () {
  describe('bar', function () {
    it('baz', function () {
      var foo = 'hello world';

      expect(foo).to.eql(bar);
    });

    it('baz', function () {
      var foo = 'hello world';
      var bar = 'hello world';

      expect(foo).to.eql(bar);
    });
  });
});
```

#### Variables & Naming:
Variables should be declared at the top of their scope (function)

```javascript
// Constructor function:
var FooBar = function () {};

// Single declaration:
var fooBar = 'bar';

// Multiple declarations:
var fooBar = 'bar';
var barFoo = 'foo';
var lol = hello;
var test;
var ok;

// jQuery object in variable, preface name with $
var $fooBar = $('.bar');

// Constants
// used only for rare cases like external dependencies
var SIGNUP_URL = 'foo';

// events are passed as `evt`
var clickHandler = function (evt) {
  evt.preventDefault();
}

// event namespace uses snake_case
$('.foo').on('click.foo_click', clickHandler);
```

#### Callbacks / objects as params
```javascript
// When passing a callback, or object as a parameter, open the curly brace on
// the same line as the function invocation.

var foo = bar(lol, function () {
  // statements
});

var foo = bar(lol, {
  // Object properties
});
```

#### Event Binding - `.on` vs aliases
```javascript
// Always use jQuery's `.on` syntax for event bindings, rather than its aliased methods, such as `.click` and `.load`.

// BAD:
$(document).load(function() { ... });
$('.my-div').click(function() { ... });

// GOOD:
$(document).on('load', function() { ... });
$('.my-div').on('click', function() { ... });
```
By using the `.on` function, we can not only bind to individual events, but also use namespaced events (i.e. 'click.modal'), use delegated events (i.e. `$('.modal').on('keypress', '.text-input', function() { ... });`), and pass object literals with event/callback pairs:
```javascript
$('.text-input').on({
  click: function() { ... }),
  keypress: function() { ... })
});
```

#### Equality
```javascript
// Only use === and !==, never == and !=

if (1 === '1') {
  // this will never be executed, which is great.
}

// .. unless the case requires loose type evaluation, see section 4.1.7 below

```

#### Conditionals
```javascript
// Always use braces, and line breaks with conditionals to promote readability
// and put else and else if statements inline with the closing brace
if (condition) {
  return true;
} else if (condition) {
  return true;
} else {
  return false;
}

```

### Iteration
```javascript
// When iterating using a function that makes a node available, use the node
// rather than `this` to access the node. For naming, use something contextual,
// or `el`.

// All of these are acceptable
$('.nodes').each(function(i, node) {
  console.log(node);
});

$('.nodes').each(function(i, el) {
  console.log(el);
});

_.map($('.nodes'), function (el) {
  console.log(el);
})
```

#### Line length
Limit line length to 80 chars.

#### Quotes
Use **single quotes**

### Project Settings
To facilitate these rules, consider adding the following to your project tests or at least text editor.

* JSHint - https://github.com/Shopify/fed-sandbox/blob/master/code/project-dots/sample.jshintrc

  ```
  "jshint": {
    "browser": true,
    "node": true,
    "curly": true,
    "eqeqeq": true,
    "evil": true,
    "indent": 2,
    "quotmark": "single",
    "regexdash": true,
    "smarttabs": false,
    "sub": true,
    "trailing": true,
    "undef": true,
    "wsh": true,
    "camelcase": true,
    "predef": [
      <YOUR GLOBALS>,
      eg:,
      "App",
      "Modernizr"
    ]
  }

  ```
* JSCS - https://github.com/Shopify/fed-sandbox/blob/master/code/project-dots/sample.jscsrc

* Sublime Linters
  * https://github.com/SublimeLinter/SublimeLinter3
  * https://sublime.wbond.net/packages/SublimeLinter-jscs
* Testing Workflow in Brochure 2 - https://github.com/Shopify/brochure2/blob/master/Gruntfile.js#L42

------------------------------------------------

## Details - Why a styleguide and where'd it come from?

This is a living document and new ideas for improving the code around us are always welcome. It is based off [idiomatic.js](https://github.com/rwaldron/idiomatic.js) and simplified for use at Shopify. It came about from the 2014 Brochure redesign where four front end developers were actively writing JS without any standards to tie everything together. It got messy.

The goal is the following:

### All code in any code-base should look like a single person typed it, no matter how many people contributed.


> #### "Arguments over style are pointless. There should be a style guide, and you should follow it"
>_Rebecca_ _Murphey_

&nbsp;

> #### "Part of being a good steward to a successful project is realizing that writing code for yourself is a Bad Idea™. If thousands of people are using your code, then write your code for maximum clarity, not your personal preference of how to get clever within the spec."
>_Idan_ _Gazit_

### Resources

 * [jshint](http://jshint.com/)
 * [Annotated ECMAScript 5.1](http://es5.github.com/)
 * [EcmaScript Language Specification, 5.1 Edition](http://ecma-international.org/ecma-262/5.1/)

## [Preface](https://www.youtube.com/watch?v=0hiUuL5uTKc)

The following sections outline a style guide for modern JavaScript development.
They are meant to be prescriptive. The most important take-away is the
**law of code style consistency**. Whatever you choose as the style for your
project should be considered law. Link to this document as a statement of your
project's commitment to code style consistency, readability and maintainability.

## Table of Contents

 1. [Whitespace](#whitespace)
 2. [Beautiful Syntax](#spacing)
 3. [Type Checking (Courtesy jQuery Core Style Guidelines)](#type)
 4. [Conditional Evaluation](#cond)
 5. [Naming](#naming)
 6. [Comments](#comments)
 7. [jQuery](#jquery)

1. <a name="whitespace">Whitespace</a>
  - Never mix spaces and tabs. Indentation should be 2 spaces.
  - If your editor supports it, always work with the "show invisibles" setting turned on. The benefits of this practice are:
    - Enforced consistency
    - Eliminating end of line whitespace
    - Eliminating blank line whitespace
    - Commits and diffs that are easier to read



2. <a name="spacing">Beautiful Syntax</a>

  A. Parens, Braces, Linebreaks

  ```javascript

  // if/else/for/while/try always have spaces, braces and span multiple lines
  // this encourages readability

  // 2.A.1.1
  // Examples of really cramped syntax

  if(condition) doSomething();

  while(condition) iterating++;

  for(var i=0;i<100;i++) someIterativeFn();


  // 2.A.1.1
  // Use whitespace to promote readability

  if (condition) {
    // statements
  }

  var i,
    length = 100;

  for (i = 0; i < length; i++) {
    // statements
  }

  var prop;

  for (prop in object) {
    // statements
  }

  if (true) {
    // statements
  } else {
    // statements
  }

  ```


  B. Assignments, Declarations, Functions (Named, Expression, Constructor)

  ```javascript

  // 2.B.1.1
  // Variables

  var foo = 'bar',
    num = 1,
    undef;

  // Literal notations:
  var array = [],
    object = {};

  or var array = [];
  var object = {};

  // 2.B.1.2
  // var statements should always be in the beginning of their respective scope (function).

  // Bad
  function foo () {

    // some statements here

    var bar = '',
      qux;
  }

  // Good
  function foo () {
    var bar = '',
      qux;

    // all statements after the variables declarations.
  }

  ```

  ```javascript
  // 2.B.2.1
  // Named Function Declaration
  function foo (arg1, argN) {

  }

  // Usage
  foo(arg1, argN);

  // 2.B.2.2
  // Named Function Declaration
  function square (number) {
    return number * number;
  }


  // 2.B.2.3
  // Function Expression
  var square = function (number) {
    // Return something valuable and relevant
    return number * number;
  };

  // 2.B.2.4
  // Constructor Declaration
  function FooBar (options) {
    this.options = options;
  }

  // Usage
  var fooBar = new FooBar({a: 'alpha'});

  fooBar.options;
  // { a: 'alpha' }

  ```

  D<a name="quotes">. Quotes

  Use **single** quotes in all JS.

  ```javascript
  // D.A.1
  // exception

  The only exception is with variable interpolation in CoffeeScript

    console.info '#{param}'
    // #{param}

    console.info "#{param}"
    // foo

  ```

  E. End of Lines and Empty Lines

  Whitespace can ruin diffs and make changesets impossible to read. Whitespace commits should be made separately, and to avoid these, everyone should include whitespace removal in their editor's of choice.

  ```javascript
  // E.A.1
  // Sublime Settings

  "tab_size": 2,
  "translate_tabs_to_spaces": true,
  "trim_trailing_white_space_on_save": true,
  "ensure_newline_at_eof_on_save": true,
  "rulers": [80]

  ```

  F. Switch statements

  ```javascript
  switch (evt.keyCode) {
    case App.keyCodes.ESCAPE:
      this.close();
      break;

    case App.keyCodes.LEFT:
      if (this.modalSetCount > 0) {
        this.prevItem();
      }
      break;

    case App.keyCodes.RIGHT:
      if (this.modalSetCount > 0) {
        this.nextItem();
      }
      break;

    default:
      break;
  ```
  Include a default statement when the value you\'re switching on could be `undefined`.

3. <a name="type">Type Checking (Courtesy jQuery Core Style Guidelines)</a>

    A. Actual Types

    String:

        typeof variable === "string"

    Number:

        typeof variable === "number"

    Boolean:

        typeof variable === "boolean"

    Object:

        typeof variable === "object"

    Array:

        Array.isArray( arrayLikeObject )
        (wherever possible)

    Node:

        elem.nodeType === 1

    null:

        variable === null

    null or undefined:

        variable == null

    undefined:

      Global Variables:

        typeof variable === "undefined"

      Local Variables:

        variable === undefined

      Properties:

        object.prop === undefined
        object.hasOwnProperty( prop )
        "prop" in object


4. <a name="cond">Conditional Evaluation</a>

  Prefer `===` over `==` (unless the case requires loose type evaluation, see 4.1.7)

  ```javascript

  // 4.1.1
  // When only evaluating that an array has length,
  // instead of this:
  if (array.length > 0) ...

  // ...evaluate truthiness, like this:
  if (array.length) ...


  // 4.1.2
  // When only evaluating that an array is empty,
  // instead of this:
  if (array.length === 0) ...

  // ...evaluate truthiness, like this:
  if (!array.length) ...


  // 4.1.3
  // When only evaluating that a string is not empty,
  // instead of this:
  if (string !== '') ...

  // ...evaluate truthiness, like this:
  if (string) ...


  // 4.1.4
  // When only evaluating that a string _is_ empty,
  // instead of this:
  if (string === '') ...

  // ...evaluate falsy-ness, like this:
  if (!string) ...


  // 4.1.5
  // When only evaluating that a reference is true,
  // instead of this:
  if (foo === true) ...

  // ...evaluate like you mean it, take advantage of built in capabilities:
  if (foo) ...


  // 4.1.6
  // When evaluating that a reference is false,
  // instead of this:
  if (foo === false) ...

  // ...use negation to coerce a true evaluation
  if (!foo) ...

  // ...Be careful, this will also match: 0, '', null, undefined, NaN
  // If you _MUST_ test for a boolean false, then use
  if (foo === false) ...


  // 4.1.7
  // When only evaluating a ref that might be null or undefined, but NOT false, '' or 0,
  // instead of this:
  if (foo === null || foo === undefined) ...

  // ...take advantage of == type coercion, like this:
  if (foo == null) ...

  // Remember, using == will match a `null` to BOTH `null` and `undefined`
  // but not `false`, '' or 0
  null == undefined

  ```

  ALWAYS evaluate for the best, most accurate result - the above is a guideline, not a dogma.

  ```javascript

  // 4.2.1
  // Type coercion and evaluation notes

  // Use `===` vs. `==`

  // === does not coerce type, which means that:

  '1' === 1;
  // false

  // == does coerce type, which means that:

  '1' == 1;
  // true

  // 4.2.2
  // Booleans, Truthies & Falsies

  // Booleans:
  true, false

  // Truthy:
  'foo', 1

  // Falsy:
  '', 0, null, undefined, NaN, void 0
  ```

  Prefer plain `if` and `else` over additional `else if` conditions.
  There is no `else if` in Javascript. You can iterate through multiple conditions
  by using `return` in each statement - <http://rmurphey.com/blog/2012/12/10/js-conditionals/>

  ```javascript

  // 4.3.1

  Instead of...
  function howBig(num) {
    if (num < 10) {
      return 'small';
    } else if (num >= 10 && num < 100) {
      return 'medium';
    } else if (num >= 100) {
      return 'big';
    }
  }

  do:
  function howBig(num) {
    if (num < 10) {
      return 'small';
    }

    if (num < 100) {
      return 'medium';
    }

    if (num >= 100) {
      return 'big';
    }
  }
  ```

5. <a name="naming">Naming</a>

  A. You are not a human code compiler/compressor, so don't try to be one.

  The following code is an example of egregious naming:

  ```javascript

  // 5.A.1.1
  // Example of code with poor names

  function q(s) {
    return document.querySelectorAll(s);
  }
  var i,a=[],els=q('#foo');
  for(i=0;i<els.length;i++){a.push(els[i]);}
  ```

  Without a doubt, you've written code like this - hopefully that ends today.

  Here's the same piece of logic, but with kinder, more thoughtful naming (and a readable structure):

  ```javascript

  // 5.A.2.1
  // Example of code with improved names

  function query (selector) {
    return document.querySelectorAll(selector);
  }

  var idx = 0,
    elements = [],
    matches = query('#foo'),
    length = matches.length;

  for (idx < length; idx++) {
    elements.push(matches[idx]);
  }

  ```

  A few additional naming pointers:

  ```javascript

  // 5.A.3.1
  // Naming strings

  `dog` is a string


  // 5.A.3.2
  // Naming arrays

  `dogs` is an array of `dog` strings


  // 5.A.3.3
  // Naming functions, objects, instances, etc

  camelCase; function and var declarations

  // 5.A.3.4
  // Naming constructors, prototypes, etc.

  PascalCase; constructor function

  // 5.A.3.5
  // Naming regular expressions

  rDesc = //;

  // 5.A.3.6
  // Event Namespaces

  snake_case; custom event namespaces as in the following

  $('.foo').on('click.foo_click', clickHandler);


  ```

  B. Specific Naming Conventions

  Specific conventions to help sanity. This is abritrary but helps immensely when working on large teams

  ```javascript

  // 5.B.1.0
  Events in functions are to be passed in and saved as `evt`, not `e`, not `event`.

  clickHandler = function (evt) {
    evt.preventDefault();
    this.to($(evt.delegateTarget).index());
    this.open(evt);
  }

  ```
6. <a name="comments">Comments</a>

  * Single line above the code that is subject
  * Multiline is good
  * No End of line comments!

7. <a name="jquery">jQuery</a>

* jQuery is the library of choice for DOM manipulation. Outside of themes, new projects should use latest 2.x release
* jQuery collections should be cached when used more than once, and saved with `$` prefix
  * `var $navItems = $("#MainNav").find("li");`
* `$(document).ready(function())` isn't a dumping ground. Use it to initialize a page but otherwise functionality should be organized into named functions with an easy to follow structure
The prototype pattern has been used successfully and is readable
  * eg. <https://github.com/Shopify/marketing_assets/blob/master/app/assets/javascripts/marketing_assets/modules/equal-height.js>
* Plugins can be a huge time saver (eg for complex form validation or scroll detection), but these should be evaluated based on the following:
  * is the plugin available for commercial use?
  * how active is its Github repo? Are there many issues?
  * have we already included a plugin that does a similar job? If so, that one should be used

* CSS updates should happen from within CSS files.

Instead of:

```javascript
$(".elem").style("color","red");
```
Use the following and add the styles in a CSS file:

```javascript
$(".elem").addClass("js-is-error");
```

* AJAX should use jQuery's `$.deferred` methods to avoid callback hell.

Instead of:

```javascript
$.ajax({
  success: function() {
    $.ajax({
      success: function() {
        showData();
    });
  }
});
```

Do this:

```javascript
$.when(async1(), async2()).then(showData);​
```

  * http://css-tricks.com/multiple-simultaneous-ajax-requests-one-callback-jquery/

----------


<a rel="license" href="http://creativecommons.org/licenses/by/3.0/deed.en_US"><img alt="Creative Commons License" style="border-width:0" src="http://i.creativecommons.org/l/by/3.0/80x15.png" /></a><br /><span xmlns:dct="http://purl.org/dc/terms/" property="dct:title">Principles of Writing Consistent, Idiomatic JavaScript</span> by <a xmlns:cc="http://creativecommons.org/ns#" href="https://github.com/rwldrn/idiomatic.js" property="cc:attributionName" rel="cc:attributionURL">Rick Waldron and Contributors</a> is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by/3.0/deed.en_US">Creative Commons Attribution 3.0 Unported License</a>.<br />Based on a work at <a xmlns:dct="http://purl.org/dc/terms/" href="https://github.com/rwldrn/idiomatic.js" rel="dct:source">github.com/rwldrn/idiomatic.js</a>.


[&larr; Back to FED](/Front-End-Development)
