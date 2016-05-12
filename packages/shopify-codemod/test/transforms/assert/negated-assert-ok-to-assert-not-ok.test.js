import 'test-helper';
import transform from 'assert/negated-assert-ok-to-assert-not-ok';

describe('assert/negatedAssertOkToAssertNotOk', () => {
  it('transforms negated ok assertions to assert.notOk', () => {
    expect(transform).to.transform('assert/negated-assert-ok-to-assert-not-ok/basic');
  });
});
