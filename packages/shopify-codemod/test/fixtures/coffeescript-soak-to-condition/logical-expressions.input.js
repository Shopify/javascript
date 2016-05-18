// if a?[bar]?() == 'baz'
if ((typeof a !== "undefined" && a !== null ? (typeof a[bar] === "function" ? a[bar]() : void 0) : void 0) === 'baz') {

}

// foo = a?[bar]?() == 'baz'
var foo = (typeof a !== "undefined" && a !== null ? typeof a[bar] === "function" ? a[bar]() : void 0 : void 0) === 'baz';

// if a?[bar]?() == undefined
if ((typeof a !== "undefined" && a !== null ? (typeof a[bar] === "function" ? a[bar]() : void 0) : void 0) === undefined) {

}

// var foo = a?[bar]?() != undefined
var foo = (typeof a !== "undefined" && a !== null ? (typeof a[bar] === "function" ? a[bar]() : void 0) : void 0) !== undefined;

// var foo = a?[bar]?() == null
var foo = (typeof a !== "undefined" && a !== null ? (typeof a[bar] === "function" ? a[bar]() : void 0) : void 0) == null;

// if 'baz' == a?[bar]?()
if ('baz' === (typeof a !== "undefined" && a !== null ? (typeof a[bar] === "function" ? a[bar]() : void 0) : void 0)) {

}

// foo = 'baz' == a?[bar]?()
var foo = 'baz' === (typeof a !== "undefined" && a !== null ? typeof a[bar] === "function" ? a[bar]() : void 0 : void 0);

// if undefined == a?[bar]?()
if (undefined === (typeof a !== "undefined" && a !== null ? (typeof a[bar] === "function" ? a[bar]() : void 0) : void 0)) {

}

// var foo = undefined != a?[bar]?()
var foo = undefined !== (typeof a !== "undefined" && a !== null ? (typeof a[bar] === "function" ? a[bar]() : void 0) : void 0);

// var foo = null == a?[bar]?()
var foo = null == (typeof a !== "undefined" && a !== null ? (typeof a[bar] === "function" ? a[bar]() : void 0) : void 0);

// var foo = baz == a?[bar]?()
var foo = baz === (typeof a !== "undefined" && a !== null ? (typeof a[bar] === "function" ? a[bar]() : void 0) : void 0);

// var foo = baz.qux == a?[bar]?()
var foo = baz.qux === (typeof a !== "undefined" && a !== null ? (typeof a[bar] === "function" ? a[bar]() : void 0) : void 0);

// var foo = baz.qux() == a?[bar]?()
var foo = baz.qux() === (typeof a !== "undefined" && a !== null ? (typeof a[bar] === "function" ? a[bar]() : void 0) : void 0);

// var foo = a?[bar]?() == {baz: qux}
var foo = (typeof a !== "undefined" && a !== null ? (typeof a[bar] === "function" ? a[bar]() : void 0) : void 0) === {baz: qux};

// var foo = a?[bar]?() == [baz, qux]
var foo = (typeof a !== "undefined" && a !== null ? (typeof a[bar] === "function" ? a[bar]() : void 0) : void 0) === [baz, qux];

// var foo = a?[bar]?() == new Baz()
var foo = (typeof a !== "undefined" && a !== null ? (typeof a[bar] === "function" ? a[bar]() : void 0) : void 0) === new Baz();
