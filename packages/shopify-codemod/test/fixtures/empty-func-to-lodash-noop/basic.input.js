const foo = function() {};
foo(function() {});
foo(() => {});

const foo = function() { return 'foo'; };
foo(function() { return 'bar'; });
foo(() => { return 'bar'; });
foo(() => 'bar');
