suite('test', function() {
  beforeEach(function() {
    testClock.setTime(Date.now());
    testGlobal = true;
    testGlobal = 'yes';
    this.notReplaced = true;
  });

  context('context', function() {
    it('does not mess up', function() {
      somethingElse.clock = "don't touch";
    });
  });
});
