// [this.qux..foo.bar.baz()]

(function() {
  var ref;
  var results = [];

  for (var i = ref = this.qux, ref1 = foo.bar.baz(); (ref <= ref1 ? i <= ref1 : i >= ref1); (ref <= ref1 ? i++ : i--)) {
      results.push(i);
  }

  return results;
}).apply(this);
