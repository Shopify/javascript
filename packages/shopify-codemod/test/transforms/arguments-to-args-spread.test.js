import 'test-helper';
import transform from 'arguments-to-args-spread';

describe('argumentsToArgsSpread', () => {
  it('adds args spread to empty function parameters', () => {
    expect(transform).to.transform('arguments-to-args-spread/basic');
  });

  it('ignores ineligible identifiers', () => {
    expect(transform).to.transform('arguments-to-args-spread/sanity');
  });
});
