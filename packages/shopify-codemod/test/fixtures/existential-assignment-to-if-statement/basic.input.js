if (a != null) {
  a;
} else {
  a = b;
}

if (a.b['c'] != null) {
  a.b['c'];
} else {
  a.b['c'] = d;
}

if (a != 'differentLiteral') {
  a;
} else {
  a = b;
}

if (a || null) {
  a;
} else {
  a = b;
}

if (a != null) {
  somethingElse();
  a;
} else {
  a = b;
}

if (a != null) {
  a;
} else {
  somethingElse();
  a = b;
}
