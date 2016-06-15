### `constructor-literal-assignment-to-class-property`

Moves context assignments in the constructor that are not dynamic (i.e., that don't depend on `this` and that don't depend on any bindings only available in the constructor) to class properties.

#### Example

```js
const baz = something;

class Foo {
  fuzz = 'already here';

  constructor(bar) {
    this.foo = bar.baz();
    this.bar = bar;
    this.baz = baz;
    this.qux = baz.something.else();
    this.buzz = this.foo.bar();
  }
}

// BECOMES:

const baz = something;

class Foo {
  baz = baz;
  qux = baz.something.else();
  fuzz = 'already here';

  constructor(bar) {
    this.foo = bar.baz();
    this.bar = bar;
    this.buzz = this.foo.bar();
  }
}
```
