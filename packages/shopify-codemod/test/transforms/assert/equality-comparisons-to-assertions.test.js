import 'test-helper';
import equalityComparisonsToAssertions from 'assert/equality-comparisons-to-assertions';

describe('assert/equalityComparisonsToAssertions', () => {
  it('transforms equality comparisons to assertions', () => {
    expect(equalityComparisonsToAssertions).to.transform('assert/equality-comparisons-to-assertions/basic');
  });
});
