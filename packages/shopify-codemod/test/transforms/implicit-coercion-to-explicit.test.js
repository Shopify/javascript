import 'test-helper';
import transform from 'implicit-coercion-to-explicit';

describe('implicitCoercionToExplicit', () => {
  it('transforms the most offensive implicit coercion to be explicit', () => {
    expect(transform).to.transform('implicit-coercion-to-explicit/basic');
  });
});
