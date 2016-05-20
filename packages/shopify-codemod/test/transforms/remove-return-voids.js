import 'test-helper';
import removeReturnVoids from 'remove-return-voids';

describe('removeReturnVoids', () => {
  it('Removes void returns from else generated by Decaf', () => {
    expect(removeReturnVoids).to.transform('remove-return-voids/void');
  });
  it('Removes undefined returns from else generated by Decaf', () => {
    expect(removeReturnVoids).to.transform('remove-return-voids/undefined');
  });
  it('Doesn\'t remove valid returns', () => {
    expect(removeReturnVoids).to.transform('remove-return-voids/valid');
  });
  it('Doesn\'t remove the entire block in multi-lined blocks', () => {
    expect(removeReturnVoids).to.transform('remove-return-voids/multi');
  });
});
