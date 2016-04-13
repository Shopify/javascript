// [42..foo()]

(function() {
  var results = [];

  for (var i = 42, ref = foo(); (42 <= ref ? i <= ref : i >= ref); (42 <= ref ? i++ : i--)) {
    results.push(i);
  }

  return results;
}).apply(this);
