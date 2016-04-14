// myRange = [11..400]

var myRange = (function() {
  var i;
  var results = [];

  for (i = 11; i <= 400; i++) {
      results.push(i);
  }

  return results;
}).apply(this);
