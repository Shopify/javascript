if (typeof bar.baz === 'function') {
  foo = bar.baz();
}

// foo += bar.baz?() || some.default() for bar in bars
for (let bar of bars) {
  foo += (((typeof bar.baz === 'function' ? bar.baz() : undefined))) || some.default();
}

// (foo = bar?.baz) ->
function aFunc(foo = (bar != null ? bar.baz : undefined)) {}
