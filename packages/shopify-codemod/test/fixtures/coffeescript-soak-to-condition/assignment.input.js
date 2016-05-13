// foo; foo = bar.baz?()
foo = typeof bar.baz === "function" ? bar.baz() : void 0;

// foo += bar.baz?() || some.default() for bar in bars
for (let bar of bars) {
  foo += (typeof bar.baz === "function" ? bar.baz() : void 0) || some.default();
}

// (foo = bar?.baz) ->
function aFunc(foo = typeof bar !== "undefined" && bar !== null ? bar.baz : void 0) {}

// if foo = baz?.qux
if(foo = (bar = typeof baz !== "undefined" && baz !== null ? baz.qux : void 0)) {

}
