import 'test-helper';
import moveLiteralsToExpectedArgument from 'assert/move-literals-to-expected-argument';

describe('assert/moveLiteralsToExpectedArgument', () => {
  it('moves literals in actual argument slot to expected argument slot', () => {
    expect(moveLiteralsToExpectedArgument).to.transform('assert/move-literals-to-expected-argument/basic');
  });

  it('ignores valid assertions', () => {
    expect(moveLiteralsToExpectedArgument).to.transform('assert/move-literals-to-expected-argument/ignored');
  });
});
