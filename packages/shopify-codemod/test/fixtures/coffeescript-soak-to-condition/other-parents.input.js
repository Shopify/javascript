// a?[bar]?()?
((typeof a !== "undefined" && a !== null ? (typeof a[bar] === "function" ? a[bar]() : void 0) : void 0)) != null;

// foo = -> a?[bar]?()
function foo() {
	return typeof a !== "undefined" && a !== null ? (typeof a[bar] === "function" ? a[bar]() : void 0) : void 0;
}

// foo = bar: a?[bar]?()
var foo = {
  bar: typeof a !== "undefined" && a !== null ? (typeof a[bar] === "function" ? a[bar]() : void 0) : void 0,
}

// if a?[bar]?()
// else if a?[bar]?()
if (typeof a !== "undefined" && a !== null ? (typeof a[bar] === "function" ? a[bar]() : void 0) : void 0) {

} else if (typeof a !== "undefined" && a !== null ? (typeof a[bar] === "function" ? a[bar]() : void 0) : void 0) {

}

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
var foo = (typeof a !== "undefined" && a !== null ? (typeof a[bar] === "function" ? a[bar]() : void 0) : void 0) == null

// while a?[bar]?()
while (typeof a !== "undefined" && a !== null ? (typeof a[bar] === "function" ? a[bar]() : void 0) : void 0) {

}

do {

} while (typeof a !== "undefined" && a !== null ? (typeof a[bar] === "function" ? a[bar]() : void 0) : void 0);
