import 'test-helper';
import removeEmptyReturns from 'remove-empty-returns';

describe('removeEmptyReturns', () => {
  it('removes empty returns from function declarations', () => {
    expect(removeEmptyReturns).to.transform('remove-empty-returns/function-declarations');
  });
  it('removes empty returns from function expressions', () => {
    expect(removeEmptyReturns).to.transform('remove-empty-returns/function-expressions');
  });
  it('removes empty returns from arrow expressions', () => {
    expect(removeEmptyReturns).to.transform('remove-empty-returns/arrow-functions');
  });
});
