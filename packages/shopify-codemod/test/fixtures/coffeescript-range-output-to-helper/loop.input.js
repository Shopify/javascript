// doSomething() for i in [1...300]

for (let i of (function() {
    var results = [];

    for (i = 1; i < 300; i++) {
        results.push(i);
    }

    return results;
}).apply(this)) {
  doSomething();
}
