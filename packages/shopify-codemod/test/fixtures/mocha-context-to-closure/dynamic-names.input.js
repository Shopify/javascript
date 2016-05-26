suite('foo', function() {
  setup(function() {
    this[bar] = () => 'baz';
  });

  teardown(function() {
    this[bar.toLowerCase()] = 'baz';
  });

  it('works', function() {
    expect(this[bar.toLowerCase()]).to.equal('baz');
  });
});
