import 'test-helper';
import removeUnusedExpressions from 'remove-unused-expressions';

describe('removeUnusedExpressions', () => {
  it('removes unused expressions', () => {
    expect(removeUnusedExpressions).to.transform('remove-unused-expressions/basic');
  });
});
