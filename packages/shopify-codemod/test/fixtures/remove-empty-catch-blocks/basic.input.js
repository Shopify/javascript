try {
  foo();
} catch (undefined) {

} finally {
  bar();
}

try {
  foo();
} catch (e) {} finally {
  bar();
}

try {
  foo();
} finally {}

try {
  foo();
} catch(e) {
  bar();
}
