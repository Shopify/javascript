// if a?[bar]?() == 'baz'
if (a != null && typeof a[bar] === 'function' && a[bar]() === 'baz') {

}

// foo = a?[bar]?() == 'baz'
var foo = a != null && typeof a[bar] === 'function' && a[bar]() === 'baz';

// if a?[bar]?() == undefined
if (a == null || typeof a[bar] !== 'function' || a[bar]() === undefined) {

}

// var foo = a?[bar]?() != undefined
var foo = a != null && typeof a[bar] === 'function' && a[bar]() !== undefined;

// var foo = a?[bar]?() == null
var foo = a == null || typeof a[bar] !== 'function' || a[bar]() == null;

// if 'baz' == a?[bar]?()
if (a != null && typeof a[bar] === 'function' && 'baz' === a[bar]()) {

}

// foo = 'baz' == a?[bar]?()
var foo = a != null && typeof a[bar] === 'function' && 'baz' === a[bar]();

// if undefined == a?[bar]?()
if (a == null || typeof a[bar] !== 'function' || undefined === a[bar]()) {

}

// var foo = undefined != a?[bar]?()
var foo = a != null && typeof a[bar] === 'function' && undefined !== a[bar]();

// var foo = null == a?[bar]?()
var foo = a == null || typeof a[bar] !== 'function' || null == a[bar]();

// var foo = baz == a?[bar]?()
var foo = baz === (((a != null && typeof a[bar] === 'function' ? a[bar]() : undefined)));

// var foo = baz.qux == a?[bar]?()
var foo = baz.qux === (((a != null && typeof a[bar] === 'function' ? a[bar]() : undefined)));

// var foo = baz.qux() == a?[bar]?()
var foo = baz.qux() === (((a != null && typeof a[bar] === 'function' ? a[bar]() : undefined)));

// var foo = a?[bar]?() == {baz: qux}
var foo = a != null && typeof a[bar] === 'function' && a[bar]() === {baz: qux};

// var foo = a?[bar]?() == [baz, qux]
var foo = a != null && typeof a[bar] === 'function' && a[bar]() === [baz, qux];

// var foo = a?[bar]?() == new Baz()
var foo = a != null && typeof a[bar] === 'function' && a[bar]() === new Baz();
