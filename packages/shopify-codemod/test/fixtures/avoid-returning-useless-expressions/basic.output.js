function foo() {
  console.log();
  return;
}

function bar() {
  console.warn();
  return;
}

function baz() {
  return somethingElse.log();
}

function qux() {
  return console.somethingElse();
}

function fuzz(event) {
  event.preventDefault();
  return;
}

function buzz(evt) {
  evt.preventDefault();
  evt.preventDefault();
  return;
}
