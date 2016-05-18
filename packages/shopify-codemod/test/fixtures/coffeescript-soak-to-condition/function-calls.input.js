// foo = bar.baz?()
var foo = typeof bar.baz === "function" ? bar.baz() : void 0;

// foo = bar?()?.baz.qux?.buzz
var foo = typeof bar === "function" ? ((ref = bar()) != null ? ((ref1 = ref.baz.qux) != null ? ref1.buzz : void 0) : void 0) : void 0;

// bar.baz?()
typeof bar.baz === "function" ? bar.baz() : void 0;

// foo = bar[baz]?()
var foo = typeof bar[baz] === "function" ? bar[baz]() : void 0;
