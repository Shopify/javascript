if (a != null) {
  a;
} else {
  a = b;
}

if (differentID != null) {
  a;
} else {
  a = b;
}

if (a || null) {
  a;
} else {
  a = b;
}

if (a != 'differentLiteral') {
  a;
} else {
  a = b;
}

if (a != null) {
  differentID;
} else {
  a = b;
}

if (a != null) {
  a;
} else {
  differentID = b;
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
