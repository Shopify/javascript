(pass ? bar : baz);

(() => {
  if (multilineConsequent) {
    bar = 34;
    return bar;
  } else {
    return baz;
  }
})();

(() => {
  if (multilineAlternate) {
    return bar;
  } else {
    baz = 34;
    return baz;
  }
})();

(() => {
  moreThanJustAnIfStatement()
  if (fail) {
    return bar;
  } else {
    return baz;
  }
})();

someFunction();
