// This code is harebrained, but the transform should not change its behaviour.
function foo() {
  if (bar) {
    return bar();
  } else {
    return;
  }
  console.log('unreachable');
}
