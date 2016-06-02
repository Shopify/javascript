function foo() {
  const bar = $('.bar');
  bar.removeClass('active');
  bar.find('a').removeClass('active');
  console.log(bar);
}
