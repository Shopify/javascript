// a?[bar]?()?
a != null && typeof a[bar] === 'function' && a[bar]() != null;

// foo = -> a?[bar]?()
function foo() {
  if (a != null && typeof a[bar] === 'function') {
    return a[bar]();
  } else {
    return null;
  }
}

// foo = bar: a?[bar]?()
var foo = {
  bar: (a != null && typeof a[bar] === 'function' ? a[bar]() : undefined),
}

// if a?[bar]?()
// else if a?[bar]?()
if (a != null && typeof a[bar] === 'function' && a[bar]()) {

} else if (a != null && typeof a[bar] === 'function' && a[bar]()) {

}

// if a?[bar]?() == 'baz'
if (a != null && typeof a[bar] === 'function' && a[bar]() === 'baz') {

}

// foo = a?[bar]?() == 'baz'
var foo = a != null && typeof a[bar] === 'function' && a[bar]() === 'baz';

// if a?[bar]?() == undefined
if ((((a != null && typeof a[bar] === 'function' ? a[bar]() : undefined))) === undefined) {

}

// var foo = a?[bar]?() != undefined
var foo = a != null && typeof a[bar] === 'function' && a[bar]() !== undefined;

// var foo = a?[bar]?() == null
var foo = (((a != null && typeof a[bar] === 'function' ? a[bar]() : undefined))) == null

// while a?[bar]?()
while (a != null && typeof a[bar] === 'function' && a[bar]()) {

}

do {

} while (a != null && typeof a[bar] === 'function' && a[bar]());
