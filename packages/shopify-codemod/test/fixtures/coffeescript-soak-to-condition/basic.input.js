// foo = bar?.baz
var foo = typeof bar !== "undefined" && bar !== null ? bar.baz : void 0;

// foo = bar?.baz.qux?.buzz
var foo = typeof bar !== "undefined" && bar !== null ? ((ref = bar.baz.qux) != null ? ref.buzz : void 0) : void 0;

// foo = bar.baz?.qux?.buzz
var foo = (ref = bar.baz) != null ? ((ref1 = ref.qux) != null ? ref1.buzz : void 0) : void 0;

// foo = bar?[baz]?[qux].buzz?.fuzz
var foo = typeof bar !== "undefined" && bar !== null ? ((ref = bar[baz]) != null ? ((ref1 = ref[qux].buzz) != null ? ref1.fuzz : void 0) : void 0) : void 0;

var foo = bar != null ? bar.baz() : void 0;
