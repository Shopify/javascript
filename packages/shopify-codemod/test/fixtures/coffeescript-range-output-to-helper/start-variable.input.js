// callWith([foo...42])

callWith((function() {
  var results = [];

  for (var i = foo; (foo <= 42 ? i < 42 : i > 42); (foo <= 42 ? i++ : i--)) {
      results.push(i);
  }

  return results;
}).apply(this));
