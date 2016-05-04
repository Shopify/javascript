// doSomething() for i in [1...300]

for (let i of Shopify.range({
  from: 1,
  to: 300,
  inclusive: false
})) {
  doSomething();
}
