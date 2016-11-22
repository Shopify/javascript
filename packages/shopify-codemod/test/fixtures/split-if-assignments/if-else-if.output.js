a = 1;
if (a) {
  foo();
} else {
  b = 2;

  if (b) {
    bar();
  } else {
    c = 3;

    if (c) {
      baz();
    } else {
      d = 4;

      if (d) {
        baz();
      } else {
        qux();
      }
    }
  }
}
