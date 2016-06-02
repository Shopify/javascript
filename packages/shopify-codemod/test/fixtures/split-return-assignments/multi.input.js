foo(() => {
  console.log(bar);
  return this.sho = this.doo = this.zoo = 0;
});

foo(() => {
  foo();
  return foo = bar = baz;
});
