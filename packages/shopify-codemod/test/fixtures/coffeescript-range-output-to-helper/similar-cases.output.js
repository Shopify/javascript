var myRange = (function() {
  var i;
  var results = [];

  for (i = 11; i < 400; i++) {
      results.push(i);
  }

  return results;
}).foo(this);

var myRange = (function() {
  var i;
  var results = [];

  for (i = 11; i < 400; i++) {
      results.push(i);
  }

  return results;
})(this);

var myRange = function() {
  var i;
  var results = [];

  for (i = 11; i < 400; i++) {
      results.push(i);
  }

  return results;
};

var myRange = (function() {
  var i;
  var results = [];

  for (i = 11; i < 400; i++) {
      results.push(i);
  }

  return somethingElse();
}).apply(this);

for (let i of (function() {
    var results = [];

    for (i = 1; i < 300; i++) {
      results.doSomething(i);
    }

    return results;
}).apply(this)) {
  doSomething();
}
