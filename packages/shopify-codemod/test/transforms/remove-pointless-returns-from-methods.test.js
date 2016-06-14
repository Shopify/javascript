import 'test-helper';
import removePointlessReturnsFromMethods from 'remove-pointless-returns-from-methods';

describe('removePointlessReturnsFromMethods', () => {
  it('removes pointless returns from lodash methods only', () => {
    expect(removePointlessReturnsFromMethods).to.transform('remove-pointless-returns-from-methods/lodash');
  });
});
