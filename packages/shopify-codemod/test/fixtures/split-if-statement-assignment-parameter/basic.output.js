img = files[0];
if (img) {
  foo();
}

foo = false;
bar = true;

if (foo, bar) { foo(); }

foo = bar;

if (foo, baz) {}
foo = bar;
baz = qux;

if (foo, baz) {}
