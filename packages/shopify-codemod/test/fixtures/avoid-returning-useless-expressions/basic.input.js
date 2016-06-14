function foo() {
  return console.log();
}

function bar() {
  return console.warn();
}

function baz() {
  return somethingElse.log();
}

function qux() {
  return console.somethingElse();
}

function fuzz(event) {
  return event.preventDefault();
}

function buzz(evt) {
  evt.preventDefault();
  return evt.preventDefault();
}
