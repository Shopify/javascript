foo(() => {
  console.log(bar);
  this.sho = this.doo;
  this.doo = this.zoo;
  this.zoo = 0;
  return this.sho;
});

foo(() => {
  foo();
  foo = bar;
  bar = baz;
  return foo;
});
