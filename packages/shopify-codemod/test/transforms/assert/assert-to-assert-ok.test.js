import 'test-helper';
import assertToAssertOk from 'assert/assert-to-assert-ok';

describe('assert/assertToAssertOk', () => {
  it('transforms assert to assert.ok', () => {
    expect(assertToAssertOk).to.transform('assert/assert-to-assert-ok/basic');
  });
});
