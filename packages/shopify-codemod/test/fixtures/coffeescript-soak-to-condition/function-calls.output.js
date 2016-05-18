if (typeof bar.baz === 'function') {
  var foo = bar.baz();
}

// foo = bar?()?.baz.qux?.buzz
var foo = typeof bar === "function" ? ((ref = bar()) != null ? ((ref1 = ref.baz.qux) != null ? ref1.buzz : void 0) : void 0) : void 0;

if (typeof bar.baz === 'function') {
  bar.baz();
}

if (typeof bar[baz] === 'function') {
  var foo = bar[baz]();
}
