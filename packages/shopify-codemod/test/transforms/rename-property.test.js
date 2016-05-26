import 'test-helper';
import transform from 'rename-property';

describe('renameProperty', () => {
  it('transformed object-property pairs to new names', () => {
    expect(transform).to.transform('rename-property/basic', {
      renameProperties: {
        _: {
          first: 'head',
          each: 'forEach',
        },
      },
    });
  });
});
