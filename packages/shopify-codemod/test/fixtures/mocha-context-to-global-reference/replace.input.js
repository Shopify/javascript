suite('test', function() {
  beforeEach(function() {
    this.clock.setTime(Date.now());
    this.shouldBeReplaced = true;
    this.mustBeReplaced = 'yes';
    this.notReplaced = true;
  });

  context('context', function() {
    it('does not mess up', function() {
      somethingElse.clock = "don't touch";
    });
  });
});
