import 'test-helper';
import transform from 'add-missing-parseint-radix';

describe('addMissingParseintRadix', () => {
  it('adds missing radix parameters where appropriate', () => {
    expect(transform).to.transform('add-missing-parseint-radix/basic');
  });
});
