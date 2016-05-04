// foo; foo = bar?()?.baz.qux?.buzz
foo = typeof bar === "function" ? ((ref = bar()) != null ? ((ref1 = ref.baz.qux) != null ? ref1.buzz : void 0) : void 0) : void 0;

// foo += bar?()?.baz.qux?.buzz || some.default() for bar in bars
for (let bar of bars) {
  foo += ((typeof bar === "function" ? (ref = bar()) != null ? ((ref1 = ref.baz.qux) != null ? ref1.buzz : void 0) : void 0 : void 0)) || some.default();
}

// (foo = bar?.baz) ->
function aFunc(foo = typeof bar !== "undefined" && bar !== null ? bar.baz : void 0) {}

// foo = bar?()?.baz.qux?.buzz
// bar = foo.something()
var foo = typeof bar === "function" ? ((ref = bar()) != null ? ((ref1 = ref.baz.qux) != null ? ref1.buzz : void 0) : void 0) : void 0,
  bar = foo.somethingElse();
