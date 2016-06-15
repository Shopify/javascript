(() => {
  if (pass) {
    return bar;
  } else {
    return baz;
  }
})();

(function () {
  if (pass) {
    return bar;
  } else {
    return baz;
  }
})();

((arg) => {
  if (pass) {
    return arg;
  } else {
    return baz;
  }
})(param);

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
