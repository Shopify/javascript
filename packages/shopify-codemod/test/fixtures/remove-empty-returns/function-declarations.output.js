function functionDeclaration() {
  foo();
  function foo() {
    if (bar) {
      return;
    }
    doSomething();
    return foo;
  }
}
