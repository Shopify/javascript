import 'test-helper';
import transform from 'empty-func-to-lodash-noop';

describe('emptyFuncToLodashNoop', () => {
  it('transforms only empty functions to _.noop', () => {
    expect(transform).to.transform('empty-func-to-lodash-noop/basic');
  });

  it('does not transform function declarations to _.noop to prevent hoisting differences', () => {
    expect(transform).to.transform('empty-func-to-lodash-noop/declaration');
  });

  it('transforms empty methods to _.noop', () => {
    expect(transform).to.transform('empty-func-to-lodash-noop/method');
  });
});
