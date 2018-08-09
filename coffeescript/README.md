# CoffeeScript Style Guide

**Note: CoffeeScript is deprecated at Shopify, please do not write any new CoffeeScript files.** Only use this guide if you’re updating existing CoffeeScript and converting is out of scope.

## Intro

This guide presents a collection of best-practices and coding conventions for the [CoffeeScript](http://jashkenas.github.com/coffee-script/) programming language, and describes how we write CoffeeScript at Shopify.

It is open to changes and improvements; every line is debatable. If you disagree with any of the conventions here, please ping people in the [#fed](https://shopify.slack.com/messages/fed/) Slack channel or open an [issue](https://github.com/Shopify/CoffeeScript-Style-Guide/issues) or [pull request](https://github.com/Shopify/CoffeeScript-Style-Guide/pulls).

## Table of contents

1.  [Intro](#intro)
2.  [Table of contents](#table-of-contents)
3.  [Formatting and layout](#formatting-and-layout)
4.  [Encoding](#encoding)
5.  [Line length](#line-length)
6.  [Indentation](#indentation)
7.  [Whitespace in expressions and statements](#whitespace-in-expressions-and-statements)
8.  [Trailing whitespace](#trailing-whitespace)
9.  [Blank lines](#blank-lines)
10. [Syntax](#syntax)
11. [Commas and semicolons](#commas-and-semicolons)
12. [Operators and conditionals](#operators-and-conditionals)
13. [Declaring functions and methods](#declaring-functions-and-methods)
14. [Parentheses](#parentheses)
15. [Braces](#braces)
16. [Object properties](#object-properties)
17. [Strings](#strings)
18. [Regular expressions](#regular-expressions)
19. [Looping and comprehensions](#looping-and-comprehensions)
20. [this and @](#this-and-)
21. [Return values](#return-values)
22. [Module Imports](#module-imports)
23. [Naming](#naming)
24. [Comments](#comments)
25. [Block comments](#block-comments)
26. [Inline comments](#inline-comments)
27. [Annotations](#annotations)
28. [Exceptions and errors](#exceptions-and-errors)
29. [Miscellaneous](#miscellaneous)
30. [Inspiration](#inspiration)

## Formatting and layout

### Encoding

- UTF-8 is the preferred source file encoding.

- Use Unix-style line endings.

### Line length

- [Prefer a maximum line length of 80 characters](http://stackoverflow.com/a/4651037) or, if you must, a maximum of 120 characters.

- Avoid line continuation (`\`).

  ```coffeescript
  # No
  example = "we would rather not have to \
    break up very long lines like this."
  ```

- In cases where method calls are being chained and the code does not fit on a single line, each call should be placed on a separate line and indented by one level (i.e., two spaces), with a leading `.`.

```coffeescript
[1..3]
  .map((x) -> x * x)
  .concat([10..12])
  .filter((x) -> x < 11)
  .reduce((x, y) -> x + y)
```

### Indentation

- Use spaces only, with 2 spaces per indentation level. Never mix tabs and spaces.

  ```coffeescript
  foo: (bar) ->
    return 'foo' + bar
  ```

- Indent `when` within a `switch`.

  ```coffeescript
  getDay: (day) ->
    switch day
      when '1'
        "Sunday"
      when '2'
        "Monday"
      …
  ```

- Multiline hashes are indented with 2 spaces.

  ```coffeescript
  foo =
    fizz: "Fizz"
    buzz: "Buzz"
    qux:  "Qux"
    doo:  "Doo"
  ```

- Multiline `if`/`else` clauses should use indentation:

  ```coffeescript
  # Yes
  if true
    …
  else
    …

  # No
  if true then …
  else …
  ```

### Whitespace in expressions and statements

- Single space on either side of operators, even if it is the first or last character inside parentheses

  - assignment: `=`. You can add extra spaces to the left `=` to vertically align assignments, if this improves readability.

  - augmented assignment: `+=`, `-=`, etc.

  - comparisons: `==`, `<`, `>`, `<=`, `>=`, `unless`, etc.

  - arithmetic operators: `+`, `-`, `*`, `/`, etc.

  - arrow operators that declare functions: `->`, `=>`.

  ```coffeescript
  test: (param = null) -> # Yes
  test: (param=null) ->   # No

  x( -> 3) # Yes
  x(-> 3)  # No

  # Yes
  x = 1
  y = 1
  fooBar = 3

  # Sure
  x      = 1
  y      = 1
  fooBar = 3
  ```

- Single space after commas and colons, no space before

  ```coffeescript
  console.log(x, y)  # Yes
  console.log(x , y) # No
  console.log(x,y)   # No

  foo =
    fizz: "Fizz"     # Yes
    buzz : "Buzz"    # No
  ```

- Avoid spaces inside parentheses, brackets, or braces

  ```coffeescript
     $('body')   # Yes
     $( 'body' ) # No
  ```

- When declaring a function that takes arguments, always use a single space after the closing parenthesis of the arguments list:

  ```coffeescript
  foo = (arg1, arg2) -> # Yes
  foo = (arg1, arg2)->  # No
  ```

### Trailing whitespace

- Do not include trailing whitespace on any lines.

### Blank lines

- Use a single empty line between functions and class definitions.

- No new line between Class declaration and first line of definition.

  ```coffeescript
  # Yes
  class Foo
    constructor: () ->
      …

  # No
  class Bar

    constructor: () ->
    …

  # Yes
  class Qux
    constructor: () ->

  class Doo
    constructor: () ->

  # No
  class Fizz
    constructor: () ->
  ```

class Buzz
constructor: () ->

````
- Separate method definitions inside of a class with a single blank line.

```coffeescript
  # Yes
  funcOne: (el) ->
    el.classList.add(CLASS_ONE)

  funcTwo: (el) ->
    el.classList.remove(CLASS_TWO)

  # No
  funcThree: (foo, bar) ->
    qux = foo.fizz + bar.buzz
    rc = if (qux > 10) then "wibble" else "wobble"
    "we #{rc}"
  funcFour: (baz) ->
    …

  # No
  funcFive: (foo, bar) ->
    foo + ':' + bar


  funcSix: (qux, doo) ->
    qux + ':' + doo
````

- Use a single blank line within the bodies of methods or functions to separate sections of code into logical paragraphs, where this improves readability.

- Use a single empty line at the end of the file.

## Syntax

### Commas and semicolons

- Avoid the use of commas before newlines when properties or elements of an Object or Array are listed on separate lines.

  ```coffeescript
    # Yes
    foo = [
      'some'
      'string'
      'values'
    ]
    bar:
      label: 'test'
      value: 87

    # No
    foo = [
      'some',
      'string',
      'values'
    ]
    bar:
      label: 'test',
      value: 87
  ```

- No semicolons

### Operators and conditionals

- Use standard logical operators `==`, `&&`, `||`, `!`, `!=`, etc.

  ```coffeescript
  # No
  if label is "debug"

  # Yes
  if label == "debug"

  # No
  if visible and enabled

  # Yes
  if visible && enabled

  # No
  @hidden = not visible

  # Yes
  @hidden = !visible

  # No
  temp or= {}

  # Yes
  temp = temp || {}
  ```

- Use `unless` rather than `if not`

  ```coffeescript
  # No
  return 'elephant' if !enabled

  # Yes
  return 'elephant' unless enabled
  ```

- Instead of using `unless…else`, use `if…else`

  ```coffeescript
  # Yes
  if true
    …
  else
    …

  # No
  unless false
    …
  else
    …
  ```

- Use `w = if x then y else z` (but avoid multiline `if`/`then` statements)

  ```coffeescript
  # No
  if direction == 'row'
    box.direction = 'column'
  else
    box.direction = 'row'

  # Yes
  newContainer.direction = if direction == 'row' then 'column' else 'row'
  ```

- Use `?=` freely. Try not to use `||=` because it usually is not what you want. `||=` in CoffeeScript is truthy conditional assignment, which is not the same as in Ruby.

### Declaring functions and methods

- Use fat arrow functions `=>` instead of `someFunction.bind()` where possible.

  ```coffeescript
  foo: (bar) =>
    fizz = parseInt(bar, @base)
  ```

- Prefer `do ->` over `(->)()`

- Omit unused arguments from function declarations

  ```coffeescript
  onFocusEvent: (event) =>
    @element.classList.add('active')

  onFocusEvent: =>
    @element.classList.add('active')
  ```

- Methods and variables that should not be exposed to the public API should not be included in the prototype of the class:

  ```coffeescript
  class Foo
    publicMethod: ->
      console.log('do stuff')
      privateMethod()

    _privateMethod = -> console.log('do secret stuff')
  ```

- Avoid empty functions.

- Avoid using a fat arrow `=>` for a private function inside a class definition scope.

  ```
  "no_private_function_fat_arrows": {
    "level": "warn"
  }
  ```

### Parentheses

- Suppress superfluous parentheses when defining functions.

  ```coffeescript
  # No
  previewLoaded: () ->

  # Yes
  previewLoaded: ->
  ```

- Suppress unnecessary parenthesis around conditions.

  ```coffeescript
  # No
  if (foo == 'foo')

  # Yes
  if foo == 'foo'
  ```

- Always use parentheses when calling functions, except in cases where you have multiline objects or functions.

  ```coffeescript
  # No
  foo bar, baz

  # Yes
  foo(bar, baz)

  # Yes
  foo(bar, baz: qux)

  # Yes
  foo bar,
    baz: qux
    qui: quo

  # Yes
  foo(bar, -> baz)

  # Yes
  foo bar, ->
    baz = qui
    qui
  ```

- Don’t use “function grouping style” (parentheses used to group functions instead of being used to group function parameters).

  ```coffeescript
  # No
  ($ '#selektor').addClass 'klass'

  (foo 4).bar 8

  # Yes
  $('#selektor').addClass('klass')

  foo(4).bar 8
  ```

- Always use parentheses around comprehensions.

### Braces

- Suppress braces in argument calls if possible.

  ```coffeescript
  # No
  wibble({foo: 'bar'})

  # Yes
  wibble(foo: 'bar')
  ```

### Object properties

- Omit key names for object properties with the same name as variables.

  ```coffeescript
  # No
  render({fizz: fizz, buzz: buzz})

  # Yes
  render({fizz, buzz})
  ```

### Strings

- Use string interpolation instead of string concatenation:

  ```coffeescript
  # No
  @document.querySelectorAll('[data-block_id]='+ blockId);

  # Yes
  @document.querySelectorAll("[data-block-id]=#{blockId}")
  ```

- Use double quotes for string interpolation.

- Avoid nested string interpolation:

  ```coffeescript
  # Yes
  str = "Book by #{firstName.toUpperCase()} #{lastName.toUpperCase()}"

  # No
  str = "Book by #{"#{firstName} #{lastName}".toUpperCase()}"
  ```

- Prefer single quoted strings (`''`) instead of double quoted (`""`) strings, unless features like string interpolation are being used for the given string.

### Regular expressions

- Use regex literals instead of a `RegExp` constructor:

  ```coffeescript
  # Yes
  re = /ab+c/;

  # No
  re = new RegExp("ab+c");
  ```

- Leverage regex comments using the [extended regex syntax](http://coffeescript.org/#regexes):

  ```coffeescript
  OPERATOR = /// ^ (
    ?: [-=]>             # function
     | [-+*/%<>&|^!?=]=  # compound assign / compare
     | >>>=?             # zero-fill right shift
     | ([-+:])\1         # doubles
     | ([&|<>])\2=?      # logic / shift
     | \?\.              # soak access
     | \.{2,3}           # range or splat
  ```

### Looping and comprehensions

- Use `map` and `filter` instead of comprehensions

  ```coffeescript
  # Yes
  results = array.map((item) -> item.name)

  # No
  results = (item.name for item in array)
  ```

- Use comprehensions to iterate over the keys and values of objects:

  ```coffeescript
  object = one: 1, two: 2
  alert("#{key} = #{value}") for key, value of object
  ```

### this and @

- Prefer `@property` over `this.property`.

  ```coffeescript
  return @property     # Yes
  return this.property # No
  ```

- Avoid the use of standalone `@`:

  ```coffeescript
  return this # Yes
  return @    # No
  ```

### Return values

- Avoid `return` where not required.

- Explicitly `return`, rather than returning the result of an array comprehension by default.

  ```coffeescript
  wubble: ->
    wibble.wobble() for wibble in @wibblies when wibble.isWobbly
    return # otherwise it returns the array that results from the iteration
  ```

## Module imports

- If using a module system (CommonJS Modules, AMD, etc.), `require` statements should be placed on separate lines.

  ```coffeescript
  require 'lib/setup'
  Backbone = require('backbone')
  ```

## Naming

- Use `camelCase`, starting with lower-case, for function, variable, and object property names.

  ```coffeescript
  insertBlock: ({element, direction, id}) ->
    # …
  ```

- Use capitalized `CamelCase` for classes and mixins. (This style is also commonly referred to as `PascalCase`, `CamelCaps`, or `CapWords`, among [other alternatives](http://en.wikipedia.org/wiki/CamelCase#Variations_and_synonyms).)

  ```coffeescript
  class DesignMode.DragManager
  ```

- Keep acronyms like HTTP, RFC, XML uppercase.

- Use `SCREAMING_SNAKE_CASE` for other constants.

  ```coffeescript
  CONSTANT_LIKE_THIS
  ```

- Use `_camelCase` to indicate “private” member variables or functions on classes, to indicate the original intent and make people feel dirty for calling private functions. Remember, though, adding `_` doesn’t _actually_ make them private, it’s just a naming convention.

  ```coffeescript
  # Don’t call this from outside
  _ignoreStuff: ->
    @_ignoring = true
  ```

- Avoid 1-letter variables names; name the arguments according to what is being passed. E.g. `array.forEach (item) ->`. `x`, `y`, `i`, and `j` are very common and _may_ be used, but a more descriptive name is preferred.

- As we do in Javascript, jQuery object variables should be prefixed with $

  ```coffeescript
  @$saveChangeButton = @$container.find(SAVE_BUTTON)
  ```

## Comments

- Prefer code that is self-explanatory without needing lots of comments to explain how it works. Avoid superfluous comments.

  ```coffeescript
  # No
  return @find('shop') # return the shop
  ```

- Document _what_ and _why_ but not _how_.

  ```coffeescript
  # Simple postMessage wrapper for 1-to-1 message/handler mapping.
  class window.PostMessenger
  ```

- If modifying code that is described by an existing comment, update the comment such that it accurately reflects the new code. (Ideally, improve the code to obviate the need for the comment, and delete the comment entirely.)

- Comments use punctuation and are capitalized (unless the first word is an identifier that begins with a lower-case letter). If a comment is short, the period at the end can be omitted.

  ```coffeescript
  # Capitalize and punctuate comments.
  ```

### Block comments

- Block comments apply to the block of code that follows them.

- Each line of a block comment starts with a `#` and a single space, and should be indented at the same level of the code that it describes.

- Paragraphs inside of block comments are separated by a line containing a single `#`.

  ```coffeescript
    # This is a block comment. Note that if this were a real block
    # comment, we would actually be describing the proceeding code.
    #
    # This is the second paragraph of the same block comment. Note
    # that this paragraph was separated from the previous paragraph
    # by a line containing a single comment character.

    init()
    start()
    stop()
  ```

### Inline comments

- Inline comments are placed on the line immediately above the statement that they are describing. If the inline comment is sufficiently short, it can be placed on the same line as the statement (separated by a single space from the end of the statement).

- All inline comments should start with a `#` and a single space.

- The use of inline comments should be limited, because their existence is typically a sign of a code smell.

### Annotations

- Annotations (e.g. `TODO`, `FIXME`, `OPTIMIZE`, `HACK`, `REVIEW`, etc.) should never be used. Create an issue instead, or just fix the problem.

## Exceptions and errors

- Do not suppress exceptions.

- When passed an error in a callback, always rescue only errors you know you can rescue from. Re-throw all others.

- Avoid `debugger` calls in production.

- Avoid throwing strings; throw `Error` instances instead.

## Miscellaneous

- Avoid hashes-as-optional-parameters in general. Does the method do too much?

- Avoid long parameter lists.

- Avoid needless metaprogramming.

- No unused variables.

- Use splats (`...`) when working with functions that accept variable numbers of arguments:

  ```coffeescript
  console.log(args...) # Yes

  (a, b, c, rest...) -> # Yes
  ```

- No JavaScript.

## Inspiration

The details in this guide have been very heavily inspired by several existing style guides and other resources. In particular:

- [Polar Mobile CoffeeScript style guide](https://github.com/polarmobile/coffeescript-style-guide)
- [AirBnB JS Style Guide](https://github.com/airbnb/javascript)
- [PEP-8](http://www.python.org/dev/peps/pep-0008/): Style Guide for Python Code
- Bozhidar Batsov’s [Ruby Style Guide](https://github.com/bbatsov/ruby-style-guide)
- [Google’s JavaScript Style Guide](http://google-styleguide.googlecode.com/svn/trunk/javascriptguide.xml)
- [Common CoffeeScript Idioms](http://arcturo.github.com/library/coffeescript/04_idioms.html)
- Thomas Reynolds’ [CoffeeScript-specific Style Guide](http://awardwinningfjords.com/2011/05/13/coffeescript-specific-style-guide.html)
- Jeremy Ashkenas’ [code review](https://gist.github.com/1005723) of [Spine](http://spinejs.com/)
- The [CoffeeScript FAQ](https://github.com/jashkenas/coffee-script/wiki/FAQ)
