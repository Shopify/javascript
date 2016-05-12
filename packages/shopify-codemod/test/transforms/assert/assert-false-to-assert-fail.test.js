import 'test-helper';
import assertFalseToAssertFail from 'assert/assert-false-to-assert-fail';

describe('assert/assertFalseToAssertFail', () => {
  it('transforms assert false to assert.fail', () => {
    expect(assertFalseToAssertFail).to.transform('assert/assert-false-to-assert-fail/basic');
  });
});
