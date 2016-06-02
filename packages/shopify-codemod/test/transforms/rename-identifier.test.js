import 'test-helper';
import transform from 'rename-identifier';

describe('renameIdentifier', () => {
  it('renames root identifiers', () => {
    expect(transform).to.transform('rename-identifier/basic', {renameIdentifiers: {foo: 'bar'}});
  });
});
