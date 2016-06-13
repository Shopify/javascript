img = files[0];
if (img) {
  foo();
}

foo = false;
bar = true;

if (foo, bar) { foo(); }
