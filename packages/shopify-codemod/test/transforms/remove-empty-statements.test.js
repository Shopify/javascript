import 'test-helper';
import removeEmptyStatements from 'remove-empty-statements';

describe('removeEmptyStatements', () => {
  it('removes empty statements', () => {
    expect(removeEmptyStatements).to.transform('remove-empty-statements/basic');
  });
});
