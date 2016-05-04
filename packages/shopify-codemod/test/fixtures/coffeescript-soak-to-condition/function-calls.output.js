if (typeof bar.baz === 'function') {
  var foo = bar.baz();
}

if (typeof bar === 'function' && bar() != null && bar().baz.qux != null) {
  var foo = bar().baz.qux.buzz;
}

if (typeof bar.baz === 'function') {
  bar.baz();
}

if (typeof bar[baz] === 'function') {
  var foo = bar[baz]();
}
