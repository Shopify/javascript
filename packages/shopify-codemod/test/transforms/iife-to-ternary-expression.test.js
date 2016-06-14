import 'test-helper';
import transform from 'iife-to-ternary-expression';

describe('iifeToTernaryExpression', () => {
  it('replaces Decaf generated IIFEs containing ternaries with original ternaries', () => {
    expect(transform).to.transform('iife-to-ternary-expression/basic', {});
  });
});
