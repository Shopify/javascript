const foo = _.noop;
foo(_.noop);
foo(_.noop);

const foo = function() { return 'foo'; };
foo(function() { return 'bar'; });
foo(() => { return 'bar'; });
foo(() => 'bar');
