function functionDeclaration() {
  foo();
  function nestedFunctionDeclaration() {
    foo();
    return;
  }
  return;
}
