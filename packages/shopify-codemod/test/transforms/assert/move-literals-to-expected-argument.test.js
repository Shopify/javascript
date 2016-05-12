import 'test-helper';
import transform from 'assert/move-literals-to-expected-argument';

describe('assert/moveLiteralsToExpectedArgument', () => {
  it('moves literals in actual argument slot to expected argument slot', () => {
    expect(transform).to.transform('assert/move-literals-to-expected-argument/basic');
  });

  it('ignores valid assertions', () => {
    expect(transform).to.transform('assert/move-literals-to-expected-argument/ignored');
  });
});
