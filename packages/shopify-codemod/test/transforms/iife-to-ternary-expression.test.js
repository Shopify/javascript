import 'test-helper';
import transform from 'iife-to-ternary-expression';

describe('iifeToTernaryExpression', () => {
  it('does not replace IIFEs that do not contain if-else statements representing ternaries', () => {
    expect(transform).to.transform('iife-to-ternary-expression/basic', {});
  });
  it('replaces IIFEs that are used in assignment and return statements', () => {
    expect(transform).to.transform('iife-to-ternary-expression/sanity', {});
  });
});
