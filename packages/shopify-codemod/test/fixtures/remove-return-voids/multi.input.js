foo = () => {
  if (bar != null) {
    return bar(true);
  } else {
    console.log('foo');
    return void 0;
  }
}
