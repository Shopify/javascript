if (differentID != null) {
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

if (a.b['differentMember'] != null) {
  a.b['c'];
} else {
  a.b['c'] = d;
}

if (a.b['c'] != null) {
  a.b['differentMember']
} else {
  a.b['c'] = d;
}

if (a.b['c'] != null) {
  a.b['c'];
} else {
  a.b['differentMember'] = d;
}
