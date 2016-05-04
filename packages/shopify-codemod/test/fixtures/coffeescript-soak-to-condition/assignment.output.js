if (typeof bar === 'function' && bar() != null && bar().baz.qux != null) {
  foo = bar().baz.qux.buzz;
}

// foo += bar?()?.baz.qux?.buzz || some.default() for bar in bars
for (let bar of bars) {
  foo += ((((typeof bar === 'function' && bar() != null && bar().baz.qux != null ? bar().baz.qux.buzz : undefined)))) || some.default();
}

// (foo = bar?.baz) ->
function aFunc(foo = (bar != null ? bar.baz : undefined)) {}
