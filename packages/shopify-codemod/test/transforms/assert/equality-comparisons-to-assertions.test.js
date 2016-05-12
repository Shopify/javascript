import 'test-helper';
import transform from 'assert/equality-comparisons-to-assertions';

describe('assert/equalityComparisonsToAssertions', () => {
  it('transforms equality comparisons to assertions', () => {
    expect(transform).to.transform('assert/equality-comparisons-to-assertions/basic');
  });
});
