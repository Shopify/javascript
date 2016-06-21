if (foo = bar) {

}

if (foo = bar[0]) {
  foo();
}

if (foo = false) {
  foo();
}

if (foo = bar = baz) {

}

if (baz = qux()) {
  foobar = foo;
}
