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

  it('transforms invalid identifier names to string literal computed keys', () => {
    expect(transform).to.transform('rename-property/invalid-identifier', {
      renameProperties: {foo: {bar: 'baz-qux'}},
    });
  });
});
