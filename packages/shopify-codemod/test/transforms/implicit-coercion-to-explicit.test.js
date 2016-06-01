import 'test-helper';
import implicitCoercionToExplicit from 'implicit-coercion-to-explicit';

describe('implicitCoercionToExplicit', () => {
  it('transforms the most offensive implicit coercion to be explicit', () => {
    expect(implicitCoercionToExplicit).to.transform('implicit-coercion-to-explicit/basic');
  });
});
