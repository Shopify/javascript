import 'test-helper';
import negatedAssertOkToAssertNotOk from 'assert/negated-assert-ok-to-assert-not-ok';

describe('assert/negatedAssertOkToAssertNotOk', () => {
  it('transforms negated ok assertions to assert.notOk', () => {
    expect(negatedAssertOkToAssertNotOk).to.transform('assert/negated-assert-ok-to-assert-not-ok/basic');
  });
});
