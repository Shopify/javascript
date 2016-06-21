foo = bar;
if (foo) {

}

foo = bar[0];

if (foo) {
  foo();
}

foo = false;

if (foo) {
  foo();
}

foo = bar = baz;

if (foo) {

}

baz = qux();

if (baz) {
  foobar = foo;
}
