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

// while a?[bar]?()
while (a != null && typeof a[bar] === 'function' && a[bar]()) {

}

do {

} while (a != null && typeof a[bar] === 'function' && a[bar]());

// unless a?[bar]?()
if (a == null || typeof a[bar] !== 'function' || !a[bar]()) {

}

// foo = bar: !a?[bar]?()
var foo = {
  bar: a == null || typeof a[bar] !== 'function' || !a[bar](),
}
