import 'test-helper';
import transform from 'computed-literal-keys-to-dot-notation';

describe('computedLiteralKeysToDotNotation', () => {
  it('transforms valid string computed keys to dot notation', () => {
    expect(transform).to.transform('computed-literal-keys-to-dot-notation/basic');
  });
});
