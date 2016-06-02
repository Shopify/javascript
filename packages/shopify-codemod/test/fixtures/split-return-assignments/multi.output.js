foo(() => {
  console.log(bar);
  this.zoo = 0;
  this.doo = this.zoo;
  this.sho = this.doo;
  return this.sho;
});

foo(() => {
  foo();
  bar = baz;
  foo = bar;
  return foo;
});
