if (bar != null) {
  var foo = bar.baz;
}

if (bar != null && bar.baz.qux != null) {
  var foo = bar.baz.qux.buzz;
}

if (bar.baz != null && bar.baz.qux != null) {
  var foo = bar.baz.qux.buzz;
}

if (bar != null && bar[baz] != null && bar[baz][qux].buzz != null) {
  var foo = bar[baz][qux].buzz.fuzz;
}

if (bar != null) {
  var foo = bar.baz();
}
